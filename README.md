# godot-mini-wasm

**在 JS 中用 Godot 的方式写 2D 游戏，直接运行 GDScript。**

一个 351KB（gzip 后 121KB）的 WASM 游戏运行时：节点树、信号、2D 渲染、输入、场景序列化，
以及一个真正能跑的 GDScript 解释器。JS 负责引导与网页交互，GDScript 负责游戏逻辑——双向互通零障碍。

> 派生自 [Godot Engine](https://github.com/godotengine/godot)（MIT）的架构与语义基准，
> 面向 Web 重新实现的迷你运行时。派生方式与全部偏差如实记录在 [PATCHES.md](PATCHES.md)。

## 特性

- **Godot 心智模型**：Node / Node2D / Sprite2D / Camera2D / Timer、`_ready` / `_process` / `_input` 生命周期、
  信号（signal / connect / emit_signal）、KEY_* 键值常量——与 Godot 一致。
- **GDScript 混合开发**：`engine.loadScript(source 或 url)` 加载 .gd 源码挂到节点上；
  JS 可调用 GDScript 方法、读写 `@export` 变量；GDScript 通过 `JavaScriptBridge.eval/emit` 调回 JS。
- **编辑器风格 API**：`engine.saveScene() / loadScene(json)` 场景序列化往返、`node.inspect()` 检查器快照、
  `engine.pause() / resume()` 运行控制。
- **零配置**：引入一个 JS 文件即可，wasm 自动定位加载；无文件系统依赖，单线程，无任何第三方库。
- **克制的 API 面**：顶层仅 `GEngine` 与核心类型，公开 API 35 个（上限 45），"可删则删"。

**本轮不支持**（如实声明，详见 [DOCS.md](DOCS.md) 兼容清单）：
音频、物理引擎、3D、UI 控件（Control）、国际化、主题、插件、导出系统、
GDScript 的 `await` / `preload` / lambda / 静态类型校验。

## 快速上手（≤10 行，可直接运行）

```html
<canvas id="game" width="480" height="320"></canvas>
<script type="module">
  import { GEngine } from './dist/godot_mini.js';

  const engine = await GEngine.init({ canvas: '#game' });
  const player = engine.Sprite2D({ name: 'Player', position: [240, 160], modulate: '#3ddc84' });
  engine.root.addChild(player);
  engine.onFrame((dt) => {
    player.rotation += dt;
    if (engine.input.isKeyPressed(GEngine.KEY.RIGHT)) player.position[0] += 200 * dt;
  });
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

## 运行示例

三个完整小游戏（每个 ≤100 行）：

- `examples/01-catch-game/` — 接水果（纯 JS）
- `examples/02-snake/` — 贪吃蛇（**核心逻辑用 GDScript，JS 只负责引导**，混合开发验收标准）
- `examples/03-scene-serialize/` — 场景 JSON 序列化往返演示

静态服务即可运行（ESM 模块需要 http 协议，直接双击 html 不行）：

```bash
# 任意静态服务器，例如：
python3 -m http.server 8080
# 打开 http://localhost:8080/examples/02-snake/
```

## 体积与性能亮点

| 指标 | 值 |
|---|---|
| godot_mini.wasm | **351 KB** 原始 / **121 KB** gzip |
| godot_mini.js | 82 KB 原始 / 22 KB gzip（含 Canvas2D 渲染器与加载器） |
| 空场景帧开销 | 每帧 2 次 wasm 调用（step + render），命令流零拷贝整数/浮点传递 |
| 启动 | wasm 实例化 ~10-30ms（视浏览器），无网络依赖（wasm 与 js 同目录） |

对比参照：Godot 4 官方 Web 导出模板 ≥35MB（本项目约其 **1%**）。

## 文档

- **[DOCS.md](DOCS.md)** — 全部 API 参考、GDScript 混合开发专章（支持/不支持清单）、生命周期对照表、示例逐段讲解、FAQ
- **[PATCHES.md](PATCHES.md)** — 派生方式、保留/删除清单、全部已知偏差（必读）
- **[TEST_REPORT.md](TEST_REPORT.md)** — 自动化测试结论（Node + headless Chromium）
- **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** — 仓库设置、Release、GitHub Pages 在线演示、Actions 工作流

## 许可证

MIT License（见 [LICENSE](LICENSE)）。派生自 Godot Engine（MIT），
上游版权声明保留于 [LICENSE-GODOT.txt](LICENSE-GODOT.txt)，
派生与偏差说明见 [PATCHES.md](PATCHES.md)。
