# godot-mini-wasm

**在 JS 中用 Godot 的方式写 2D 游戏，直接运行 GDScript——现在带物理、音频和手机触控。**

一个 WASM 游戏运行时：节点树、信号、2D 渲染、输入、场景序列化、
一个真正能跑的 GDScript 解释器，以及 v0.2.0 新增的**简化版 2D 物理**、**WebAudio 音频**、
**多点触控**。JS 负责引导与网页交互，GDScript 负责游戏逻辑——双向互通零障碍。

> 派生自 [Godot Engine](https://github.com/godotengine/godot)（MIT）的架构与语义基准，
> 面向 Web 重新实现的迷你运行时。派生方式与全部偏差如实记录在 [PATCHES.md](PATCHES.md)。

## 特性

- **Godot 心智模型**：Node / Node2D / Sprite2D / Camera2D / Timer、`_ready` / `_process` / `_input` 生命周期、
  信号（signal / connect / emit_signal）、KEY_* 键值常量——与 Godot 一致。
- **简化版 2D 物理引擎（v0.2.0）**：`RigidBody2D` / `StaticBody2D`、重力 / 反弹 / 冲量 / 阻尼、
  圆形与矩形碰撞体、`body_entered` / `body_exited` 事件——固定 60Hz 步进，与 `_physics_process` 对齐。
- **音频（v0.2.0）**：WebAudio 驱动的 `play` / `music` / `tone`（零资源合成音效）、主音量控制、
  引擎暂停时自动静音；浏览器自动播放策略自动解锁。
- **手机触控（v0.2.0）**：第一根手指自动映射为鼠标（现有键鼠游戏零改动可玩），
  多点触控 API（`input.touches` / `isTouchDown`）支持双指玩法。
- **GDScript 混合开发**：`engine.loadScript(source 或 url)` 加载 .gd 源码挂到节点上；
  JS 可调用 GDScript 方法、读写 `@export` 变量；GDScript 通过 `JavaScriptBridge.eval/emit` 调回 JS，
  也可以直接使用 `__gdmAudio` / `__gdmPhysics` 桥接助手。
- **编辑器风格 API**：`engine.saveScene() / loadScene(json)` 场景序列化往返、`node.inspect()` 检查器快照、
  `engine.pause() / resume()` 运行控制。
- **零配置**：引入一个 JS 文件即可，wasm 自动定位加载；无文件系统依赖，单线程，无任何第三方库。
- **克制的 API 面**：顶层入口未变（GEngine.init + 节点工厂 + root）；新增能力全部收在
  `engine.physics` / `engine.audio` / `engine.input` 子命名空间下（详见 [DOCS.md](DOCS.md)）。

**本轮不支持**（如实声明，详见 [DOCS.md](DOCS.md) 兼容清单）：
3D、UI 控件（Control）、国际化、主题、插件、导出系统、
GDScript 的 `await` / `preload` / lambda / 静态类型校验；
物理为简化版（无旋转、无关节、无连续碰撞检测）。

## 快速上手（≤10 行，可直接运行）

```html
<canvas id="game" width="480" height="320"></canvas>
<script type="module">
  import { GEngine } from './godot_mini.js';

  const engine = await GEngine.init({ canvas: '#game' });
  const ball = engine.RigidBody2D({ position: [240, 40], shape: 'circle', radius: 14, bounce: 0.7 });
  const floor = engine.StaticBody2D({ position: [240, 300], size: [480, 20], modulate: '#333' });
  engine.root.addChild(ball, floor);
  ball.body.onCollide(() => engine.audio.tone(660, 0.1));        // 落地发声
  engine.start();
</script>
```

混合开发（GDScript 写逻辑）：

```js
const script = await engine.loadScript('player.gd');   // 或直接传源码字符串
const player = engine.Sprite2D({ script, position: [100, 100] });
engine.root.addChild(player);
player.call('take_damage', 10);                        // JS → GDScript
player.get('health');                                  // 读取 @export var health
```

```gdscript
# player.gd
extends Sprite2D

signal died

@export var health = 100

func take_damage(amount):
    health -= amount
    if health <= 0:
        emit_signal("died")
    JavaScriptBridge.eval("console.log('hello from gdscript')")   # GDScript → JS
```

物理事件进 GDScript（Godot 原生姿势）：

```gdscript
extends Sprite2D
signal body_entered(who_name)      # v0.2.0：物理引擎发射的信号，需声明

func _ready():
    connect("body_entered", self, "_on_body_entered")

func _on_body_entered(who_name):
    var other = get_node("../" + str(who_name))   # 伙伴名跨界，get_node 解析
    if other != null:
        JavaScriptBridge.eval("__gdmAudio.tone(880, 0.1)")   # GDScript 直接出声
```

## 运行示例

三个单文件示例（每个 ≤100 行），在仓库根目录起一个静态服务器即可玩：

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000/examples/01-physics-playground/
```

| 示例 | 演示内容 | 手机可玩 |
|---|---|---|
| [examples/01-physics-playground](examples/01-physics-playground/index.html) | 点击/触摸生成弹球，重力反弹 + 碰撞合成音效 | ✓ |
| [examples/02-touch-catch](examples/02-touch-catch/index.html) | 触控拖动篮子接水果，双指冲刺，GDScript 水果逻辑 | ✓（推荐） |
| [examples/03-gdscript-hybrid](examples/03-gdscript-hybrid/index.html) | JS 管输入与物理，GDScript 管血量与受击，双向互调 | ✓ |

## 体积与性能亮点

| 指标 | 值 |
|---|---|
| godot_mini.wasm | **417 KB** 原始 / **144 KB** gzip |
| godot_mini.js | 107 KB 原始 / 29 KB gzip（Canvas2D 渲染器 + 加载器 + 物理/音频/触控） |
| 两者合计 | **524 KB** 原始 / **173 KB** gzip |
| 空场景帧开销 | 每帧 2 次 wasm 调用（step + render）+ 1 次 JS 物理步进，命令流零拷贝传递 |
| 启动 | wasm 实例化 ~10-30ms（视浏览器），无网络依赖（wasm 与 js 同目录） |

对比参照：Godot 4 官方 Web 导出模板 ≥35MB（本项目约为其 **1.5%**）。

## 文档

- **[DOCS.md](DOCS.md)** — 全部 API 参考（含物理/音频/触控）、GDScript 混合开发专章（支持/不支持清单）、生命周期对照表、示例逐段讲解、FAQ
- **[PATCHES.md](PATCHES.md)** — 派生方式、保留/删除清单、全部已知偏差（必读）
- **[TEST_REPORT.md](TEST_REPORT.md)** — 自动化测试结论（Node 20 项 + headless Chromium 27 项 + 示例 3 项）
- **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** — 仓库设置、Release、GitHub Pages 在线演示、Actions 工作流

## 许可证

MIT License（见 [LICENSE](LICENSE)）。派生自 Godot Engine（MIT），
上游版权声明保留于 [LICENSE-GODOT.txt](LICENSE-GODOT.txt)，
派生与偏差说明见 [PATCHES.md](PATCHES.md)。
