#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "需要 Node.js 22 或更新版本，请安装后重试。"
  read -r -p "按回车关闭…"
  exit 1
fi
bash scripts/dev.sh "$@"
result=$?
if [ "$result" -ne 0 ]; then read -r -p "启动失败，按回车关闭…"; fi
exit "$result"
