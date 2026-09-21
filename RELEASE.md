# Aibo macOS 发版与自动更新

正式版启动 20 秒后检查 GitHub Release，此后每 4 小时检查一次。
更新包经过签名验证后在后台安装，下次启动生效；「更新」菜单提供检查、
失败重试和重启更新。不会自动重启打断会话，开发版不会检查更新。
聊天网页没有安装更新或重启应用的 IPC 权限。

## 首次配置

- macOS 钥匙串安装 Developer ID Application 证书。
- 复制 `app/release.env.example` 为 `app/release.env`，填写 Apple 公证账号、
  app-specific password 和 Team ID。此文件已被 Git 忽略。
- 本机已生成 Aibo 专用更新密钥 `~/.config/aibo/updater.key`，对应公钥已写入
  `app/src-tauri/tauri.conf.json`。请安全备份私钥；分发首版后不要更换，
  否则已安装的客户端不能验证后续更新。不要将私钥提交到仓库。
- 构建机需要 Node 22+、Rust、Xcode 命令行工具、dsh；发布需要登录 `gh`。
  构建依赖沿用 `scripts/build.sh`，从已安装的 dsh 链接。

更新源是公开仓库 `omdsh-dev/dsh-gal` 的
`https://github.com/omdsh-dev/dsh-gal/releases/latest/download/latest.json`。
仓库必须保持公开可下载。Apple 签名和更新包签名是两个独立步骤。

## 构建与发布

保持以下文件版本一致，并更新相应 lockfile：根目录 `package.json`、
`app/package.json`、`app/src-tauri/Cargo.toml`、`app/src-tauri/tauri.conf.json`。
版本使用数字 major.minor.patch，且必须高于已发布正式版。

```sh
node scripts/check-release.mjs
bash scripts/release.sh            # 构建、签名、公证，不发布
# 提交代码后：
bash scripts/release.sh --publish  # 重新构建并发布 v<version>
```

产物在 `dist/release/<version>/`：DMG 安装包、Aibo.app.tar.gz、更新签名、
latest.json。再次构建同版本前先移走原产物目录。脚本拒绝重复发布版本，
发布所有文件后验证公开 latest.json。不会覆盖本机已安装的应用。

目前只发布构建机架构（本机为 Apple Silicon）。后续不要切换架构；若要同时支持
Intel，需分别构建两个架构并合并到同一个更新清单。

应用首次运行仍需安装其私有 dsh 运行时，自动更新不会改变这一要求。

## 两版本升级验收

1. 先安装包含此功能的首个正式 DMG，把 Aibo 拖入 /Applications 后运行，
   不要直接从挂载的 DMG 内运行。此前不含更新器的旧版需要手动安装这一次。
2. 发布更高版本，在已安装的旧版里点击「更新 → 检查更新」。
3. 下载完成后结束正在执行的任务，点击重启更新。确认 About 中的版本、
   会话和偏好保留、启动器正常。
4. 断网或签名失败时应保留当前应用并允许重试。

编译检查和发布清单测试不等于两版本安装验收；修改代码本身不会对外发布。
