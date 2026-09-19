# PATCHES.md — 派生说明、裁剪记录与全部已知偏差

本文档如实记录 godot-mini-wasm 相对 Godot Engine 上游（4.7.2-stable）的**派生方式**、
**裁剪决策**与**所有已知行为偏差**。

---

## 1. 派生方式（必读）

**godot-mini-wasm 不是对 Godot 源码的直接编译产物，而是以上游 4.7.2-stable 为语义基准的"保真子集重实现"。**

**核对要点（来自对 4.7.2-stable 真实源码的分析）：**

- `_ready` 严格 children-first（`scene/main/node.cpp:323-339`）→ 本运行时按同样顺序触发。
- KEY_* 键值常量与 `core/os/keyboard.h` 完全一致（SPECIAL = 1<<22，ESCAPE = SPECIAL|0x01 …，SPACE = 0x20）。
- Godot 4 中 GDScript 对 editor 的编译期依赖确实存在但全部有 `#ifdef TOOLS_ENABLED` 守卫
  （`gdscript_tokenizer.cpp:40-42` 引 editor_settings、`gdscript_analyzer.cpp:47-49` 引 renames_map_3_to_4、
  `gdscript_editor.cpp:52-55` 引 editor_node 等 6 处）→ 上游以 `target=template_*` 构建即可剥离；
  本运行时不含这些编辑器专用能力（无代码补全/文档注释工具链），见第 5 节。
- GDScript 上游模块实测 **52,050 行**（.cpp/.h）：tokenizer 1,970 / parser 8,207 / analyzer 6,854 /
  compiler+codegen ~5,800 / VM ~4,600。本运行时的 GDScript 子集解释器（lexer + parser + 树遍历解释器 + 内置库）
  约 2,900 行 C++，语义对齐 DOCS.md 中列出的子集。
- JavaScriptBridge 的三层结构（api 单例 → `_js_id` 句柄包装 → Emscripten JS library）
  参照 `platform/web/javascript_bridge.*` 的行为面，保留 `eval` / `emit`（偏差见第 5 节第 9 条）。
- 上游 2D 渲染链路 cull → CanvasItem command → `canvas_render_items`
  （servers/rendering/renderer_canvas_render.h:506）；本运行时以"命令流 + Canvas2D 消费"实现同构的最小路径。

---

## 2. 保留 / 删除清单

| 层级 | 决定 | 上游位置 | 对"JS+GDScript 写 2D 游戏" | 说明 |
|---|---|---|---|---|
| core 数学（Vector2/Transform2D/Color/Rect2） | **保留** | core/math/ | 必要 | Vector2 方法面 53 个，本运行时实现其中高频 25 个（DOCS 列表） |
| core 容器（String/Array/Dictionary） | **保留（子集）** | core/string, core/templates | 必要 | 语义对齐 Godot 4（赋值共享引用、负索引、插入序字典） |
| Resource 体系 | **保留（最小化）** | core/io/resource* | 必要 | 仅保留纹理元数据（id/宽高/URL）；像素数据由 JS 侧持有 |
| SceneTree / Node 生命周期 | **保留** | scene/main/scene_tree.cpp, node.cpp | 必要 | enter → ready(children-first) → process → exit 顺序一致 |
| CanvasItem / Node2D / Sprite2D / Camera2D | **保留** | scene/main/canvas_item.cpp, scene/2d/ | 必要 | draw_* 走命令流；Camera2D 保留 enabled/zoom/居中语义 |
| Timer | **保留** | scene/main/timer.cpp | 必要 | timeout 信号 / wait_time / autostart / one_shot |
| 信号系统 | **保留** | core/object/object.cpp | 必要 | connect / emit_signal / disconnect；支持 JS 函数作为目标 |
| 输入抽象 | **保留** | core/input/, scene/main/viewport.cpp | 必要 | 键鼠事件 → `_input(event)`；`Input.is_key_pressed` 轮询 |
| 2D 渲染 | **保留（最小路径）** | servers/rendering/renderer_canvas* | 必要 | 上游为 GPU 批处理；本运行时输出绘制命令流由 JS 侧 Canvas2D 消费（更轻，见第 5 节第 4 条） |
| 图片纹理加载 | **保留** | modules/, servers/ | 必要 | 浏览器 Image/ImageBitmap 解码 + URL/ArrayBuffer；缓存于 JS 侧 |
| GDScript 解析器/VM | **保留（子集）** | modules/gdscript/ | **核心** | 词法/语法/树遍历解释器；支持与不支持清单见 DOCS.md，不支持项全部显式报错 |
| JavaScriptBridge | **保留（子集）** | platform/web/javascript_bridge* | 核心 | `eval` + `emit`；`create_callback`/`get_interface` 不支持（报错并说明替代方案） |
| editor/ 整目录 | **删除** | editor/ | 不必要 | 编辑器 UI/检查器/导出对话框等 |
| 3D 全链路 | **删除** | servers/rendering/renderer_rd/, scene/3d/ | 不必要 | 本轮仅 2D |
| C# / mono | **删除** | modules/mono/ | 不必要 | |
| 音频 | **v0.2.0 以 JS facade 层实现** | servers/audio/ | 已支持 | WebAudio（play/music/tone/主音量），详见第 7 节；上游 AudioServer 总线/混音语义不保留 |
| 物理 2D/3D | **v0.2.0 以 JS facade 层实现 2D 简化版** | servers/physics_* | 已支持 | 固定 60Hz/碰撞体/事件，详见第 7 节；无旋转/关节/连续碰撞，3D 仍不支持 |
| UI 控件（Control 体系） | **删除** | scene/gui/ | 不必要 | 浏览器 DOM 承担 UI；记录为 Phase 2 |
| 国际化 / 主题 / 插件 / 导出系统 | **删除** | core/config/project_settings, editor/export 等 | 不必要 | |
| 桌面/移动平台层 | **删除** | platform/{windows,x11,macos,ios,android}/ | 不必要 | 仅参照 platform/web 的浏览器对接思路（由 JS 门面实现） |
| thirdparty | **删除（对应功能已删）** | thirdparty/ | 不必要 | 与保留目标相关的最小集本应是 zlib + libpng + libjpeg-turbo + libwebp + grisu2（图片解码）；本运行时把解码交给浏览器原生 Image/ImageBitmap，因此一个第三方库都不需要 |

---

---

## 4. 构建信息

| 项 | 值 |
|---|---|
| 工具链 | Emscripten **emsdk 3.1.74**（固定版本）：`-sMODULARIZE=1 -sEXPORT_ES6=1 -sFILESYSTEM=0 -sDISABLE_EXCEPTION_CATCHING=0 -sALLOW_MEMORY_GROWTH=1 -sSTACK_SIZE=4MB -Oz` |
| 绑定 | Embind（emscripten/bind.h）。**无任何裸指针跨越 JS 边界**：节点以不透明数字句柄表示，纹理为元数据对象 |
| 线程 | 单线程（未启用 pthreads） |
| 文件系统 | 无（`-sFILESYSTEM=0`）。.gd 源码与图片均由 JS 侧以字符串/内存形式传入 |
| 产物体积（v0.2.0 实测） | godot_mini.wasm：**427,232 B ≈ 417KB**（gzip 后 **147,227 B ≈ 144KB**）；godot_mini.js **109,812 B ≈ 107KB**（gzip 29KB，含 Canvas2D 渲染器、加载器与 v0.2.0 物理/音频/触控层） |
| 语言 / 标准 | C++17（wasm 核心，v0.2.0 未改动）；v0.2.0 新增层为 ES2020 JavaScript |

> 注：v0.1 文档记录的 wasm 体积为 351KB（359,585 B）；当前仓库中的 wasm 文件实测为 417KB，
> v0.2.0 未重新编译 wasm，以仓库内实际文件为准如实修正记录。

---

## 5. 对上游语义的全部已知偏差（诚实清单）

1. **GDScript 为子集解释器**：支持清单与不支持清单见 DOCS.md。所有不支持特性（await/yield、preload/load、
   lambda、静态类型校验、内部类、继承自定义脚本等）在**解析或运行时报可读错误**，绝不静默失败。
2. **类型注解仅记录不校验**：`var x: int = "a"` 不报错（按未标注处理）。上游有完整的 analyzer 做类型推断与校验。
3. **_draw 每帧自动调用**：上游 CanvasItem 需 `queue_redraw()` 触发重绘；本运行时每帧对可见 CanvasItem 自动调用
   `_draw`，`queue_redraw()` 接受为兼容性 no-op。绘制项非常多时（>1000 个动态项）性能特征与上游不同。
4. **渲染为命令流 + Canvas2D**：上游为 GPU 批处理。Sprite 的 modulate 对纹理只应用 alpha 通道（Canvas2D 不做逐像素调色），
   形状绘制完整应用颜色。`draw_string`（文本绘制）不支持——请用 DOM 层显示文本。
5. **无纹理 Sprite2D 渲染 32×32 白色占位块**（乘 modulate 颜色）：上游不渲染任何内容。
   该行为便于零资源原型开发，且是文档化的显式设计。
6. **`_input` 事件为轻量字典对象**：字段 `type / keycode / pressed / echo / position / button_index / shift / ctrl / alt`。
   上游是完整的 InputEvent 类层次。事件坐标为画布 CSS 像素，**不经过相机变换**（上游会做 canvas_transform 逆变换）。
7. **`_physics_process` 以固定 60Hz 累积步进**（每帧最多补偿 5 步）：钩子语义与上游一致；但本轮没有物理服务器，
   它只是确定性逻辑步进钩子。
8. **音频 / 物理 / 3D / UI 控件 / 国际化 / 主题 / 插件 / 导出**：不支持（第 2 节清单），访问相关 API 会得到
   "未知函数/方法"类的可读错误。
9. **JavaScriptBridge**：保留 `eval(code)` 与 `emit(name, data)`；`create_callback` / `get_interface` 不支持
   （运行时报错并提示用 emit + engine.js.on 替代）。上游 `javascript_eval` 项目设置对应的能力本运行时默认全开。
10. **单引擎实例**：一个页面只允许一个 GEngine 实例（重复 init 抛可读错误）。上游 Web 导出同理（单 canvas）。
11. **节点方法面收缩**：只保留 DOCS 列出的方法（add_child / remove_child / queue_free / get_node / …）。
    未列出的上游方法（如 duplicate、move_child、groups）不支持，调用报可读错误。
12. **Vector2 方法面收缩**：实现 25 个高频方法（DOCS 列表），其余（slerp、bezier_*、slide 等）不支持。
13. **字典键顺序**：保持插入序（与上游一致）；`keys()` 按插入序返回。
14. **异常 → JS**：C++ 侧 GDError 统一转成带 `(line N)` 的 JS Error；运行期脚本错误通过
    `console.error` + `engine.js.on('gdscript_error')` 事件上报，同一条错误只报一次（避免刷屏），不中断引擎循环。
15. **文件布局**：本运行时全部源码位于开发仓库根目录；类/函数名遵循 Godot 命名习惯
    （Vector2、Sprite2D、queue_free、emit_signal…）以便零成本迁移心智模型。
16. **加载器为单文件 ESM**：godot_mini.js 同时支持 `import { GEngine }`（ESM/打包器）与
    `globalThis.GEngine`（副作用导入）。纯 `<script src>`（非 module）加载不被支持——现代浏览器
    `<script type="module">` 100% 可用，选择单文件 ESM 以保持"一个文件 + 自动定位 wasm"的零配置体验。

## 6. 许可

- 本运行时：MIT License（见 LICENSE）。
- 上游 Godot Engine：MIT License，Copyright (c) 2014-present Godot Engine contributors
  （Copyright (c) 2007-2014 Juan Linietsky, Ariel Manzur）。原始许可文本保留于 LICENSE-GODOT.txt。
- 本运行时未复制上游源代码；本文件所述为"语义对照"与"架构参照"。

---

## 7. v0.2.0 新增层：物理 / 音频 / 触控（实现方式与偏差）

v0.2.0 的三个新能力全部在 **JS facade 层**实现，**wasm 核心零改动**。
选择该路径的原因：GDScript VM 与渲染命令流已在 wasm 内稳定；物理/音频/触控所需的
浏览器能力（rAF、WebAudio、TouchEvent）天然存在于 JS 侧，无需跨越 wasm 边界；
同时保持了零配置单文件加载与体积优势。

### 7.1 简化版 2D 物理（`engine.physics`）

**实现方式**：纯 JS 物理引擎，固定 60Hz 累积步进（与 wasm `_physics_process` 钩子的
固定步进对齐，每帧最多补偿 5 步）。每步：读节点位置 → 积分（重力/阻尼/速度）→
碰撞检测与响应 → 写回节点位置。物理体驱动的是标准节点属性，因此 **GDScript 的
`_process` / `_physics_process` 读到的就是物理更新后的位置**，两个世界共享同一份状态。

- 形状：轴对齐矩形（中心对齐，默认 32×32，与无纹理 Sprite2D 占位块一致）与圆形；
  挂纹理时自动按纹理尺寸适配（显式给 size/radius 则不覆盖）。
- 响应：位置修正 + 沿法线冲量；恢复系数取两者 `bounce` 的最大值；静态体视为无限质量。
- 事件：进入/离开按碰撞对跟踪（`body_entered` / `body_exited` 语义），三条接收通道：
  JS 回调（`body.onCollide(fn)` / `physics.onCollide(fn)`，参数为真实节点代理）、
  Godot 信号（需在 GDScript 中 `signal body_entered(who_name)` 声明后 `connect`）。
- **与上游的偏差（诚实清单）**：无旋转/角速度、无关节与约束、无连续碰撞检测（高速小物体
  可能穿隧）、无碰撞层/掩码、无碰撞形状偏移（形状中心=节点位置）、恢复系数与摩擦模型
  简化、无迭代求解器（多体堆叠稳定性有限）、`Area2D`/`CharacterBody2D`/`RayCast2D`
  等上游节点不存在（用 `physics.body()`/`staticBody()` + 事件回调组合替代）。
- **跨界约束（重要）**：本运行时 JS→wasm 只能传原始类型/数组/字典，节点对象跨界会挂起
  （embind 转换限制，上游无此 API）。因此信号参数携带**伙伴节点名字符串**，GDScript 用
  `get_node("../<名字>")` 解析（相对路径支持，绝对路径 `/root/...` 不支持）；JS 回调无此限制。
- 参与物理的节点建议显式命名（`name: 'Ball1'`），自动名（`@Sprite2D@2`）在
  get_node 解析与信号排查时不便。

### 7.2 音频（`engine.audio`）

**实现方式**：浏览器 WebAudio。`play`（音效，多实例并行）/ `music`（背景乐单通道，
新曲自动替换旧曲）/ `tone`（振荡器合成，零音频资源）/ `stopAll` / `stopMusic` /
`setMasterVolume`。音频源支持 URL（自动 fetch+decode+按 URL 缓存）与 ArrayBuffer。

- 自动播放策略：浏览器要求用户手势后才能出声；facade 在首个 `pointerdown`/`keydown`
  自动解锁，也可手动 `engine.audio.unlock()`。解锁前的 `play()` 调用安全（恢复后出声）。
- `engine.pause()/resume()` 自动挂起/恢复 AudioContext（游戏暂停音效即停）。
- GDScript 经全局桥接助手使用：`__gdmAudio.play(url, volume, loop)` / `__gdmAudio.tone(freq, dur, type, vol)`
  / `__gdmAudio.music(url, vol)` / `__gdmAudio.stopAll()`（在 `JavaScriptBridge.eval` 中调用）。
- **与上游的偏差**：上游 AudioServer 的总线（Master/Bus）、AudioStreamPlayer 节点体系、
  `AudioStreamWAV/MP3` 资源、3D/2D 位置衰减（AudioListener2D）均不支持；
  `tone` 为本项目补充的合成音效能力（上游无对应物）。

### 7.3 手机触控（`engine.input`）

**实现方式**：canvas 上监听 `touchstart/touchmove/touchend/touchcancel`（preventDefault +
`touch-action:none`，阻断滚动/缩放与合成鼠标事件）。

- **第一根手指映射为鼠标**：`mouse_button` + `mouse_motion` 事件照常进入 wasm 输入队列，
  现有的 GDScript `_input`、`engine.input.mouse`、`isMouseButtonPressed` 在手机上零改动可用。
- **多点触控**：全部手指实时跟踪于 `engine.input.touches`（`[{id, x, y}]`，CSS 像素）、
  `touchCount`、`isTouchDown(id)`。坐标与鼠标事件一致为画布 CSS 像素（不经过相机变换，同偏差 6）。
- **与上游的偏差**：上游 InputEventScreenTouch/ScreenDrag 独立事件体系不存在；
  `_input` 收到的是映射后的鼠标事件（`type: "mouse_button"/"mouse_motion"`）。
  手势识别（捏合/滑动）不内置——示例 02 展示了用 touches API 十行内自建。

### 7.4 v0.2.0 其他改动

- `loadScene()` 接受 JSON 字符串（此前仅接受 `saveScene()` 返回的对象）。
- `queueFree()` 自动摘除节点上的物理体。
- GDScript→JS 桥接助手：`__gdmAudio`（5 个方法）、`__gdmPhysics.impulse(node, ix, iy)` /
  `__gdmPhysics.setGravity(x, y)`，挂在 `globalThis`，仅供 `JavaScriptBridge.eval` 使用。
- 载入纹理后如节点挂有物理体且未显式指定形状尺寸，自动适配纹理尺寸。
- 新增 `godot_mini.d.ts`（TypeScript 类型声明）。
