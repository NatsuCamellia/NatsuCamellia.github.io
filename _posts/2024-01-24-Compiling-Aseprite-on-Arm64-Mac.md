---
layout: post
title: "在 Arm64 Mac 上編譯 Aseprite"
categories: Tutorial
description: "免費且合法地取得像素畫的熱門創作軟體"
---

[Aseprite](https://www.aseprite.org) 是一款專門為像素畫設計的繪圖軟體，功能簡單強大，在像素畫領域中非常有名，深受許多創作者喜愛。這款軟體在 Aseprite 官方網站以 19.99 美金販售，也可在 Steam 上以較便宜價格約 300 元新台幣購買。

然而，Aseprite 是一款開源軟體，Aseprite 在 [FAQ](https://www.aseprite.org/faq/#if-aseprite-source-code-is-available-how-is-that-you-are-selling-it) 中提到：

> Aseprite started being open source since its very beginning in 2001, and we were happy with that until [August 2016](http://dev.aseprite.org/post/149797781837/new-source-code-license). **Now you can still download its source code, compile it, and use it for your personal purposes.** You can [make commercial art/assets with it too](https://www.aseprite.org/faq/#can-i-sell-graphics-created-with-aseprite). The only restriction in [Aseprite EULA](https://github.com/aseprite/aseprite/blob/master/EULA.txt) is that [you cannot redistribute Aseprite](https://www.aseprite.org/faq/#can-i-redistribute-aseprite) to third parties.

內容大意是使用者可以自行使用原始碼編譯程式，且使用 Aseprite 創作的畫作可以用作商業用途，唯一限制是不能分享編譯後的軟體。在 [Aseprite GitHub](https://github.com/aseprite/aseprite) 中有清楚詳細的編譯教學，雖然對於一般人而言還是需要不少努力才能完成編譯，不過對於資訊背景的人可說是保母級教學了。

## 編譯步驟

> 以下資訊皆為撰文日期（2024 年 1 月 24 日）所得

1. 安裝編譯時需要的共通套件
2. 安裝 Mac 所需的套件
3. 編譯
4. 做成可以放在啟動台的應用程式方便使用

## 安裝共通套件

需要的共通套件有：
1. CMake `3.16+`
2. Ninja
3. Skia `aseprite-m102`

### CMake

[CMake](https://cmake.org) 是用來建置 C++ 程式的工具。

1.  `cmake --version` 檢查電腦中是否已經安裝版本 3.16 以上的 CMake。
2. `brew install cmake` 從 Homebrew 安裝 CMake。

### Ninja

Ninja 是由 Google 員工 Evan Martin 開發的小型建置系統。 Ninja 注重速度，被設計為盡可能快地運行。

1. `ninja --version` 檢查電腦中是否已經安裝 Ninja。
2. `brew install ninja` 從 Homebrew 安裝 Ninja。

### Skia

Skia 是 Aseprite 的其中一個套件，依賴關係為 Aseprite > Laf > Skia。本次安裝所需的 Skia 版本為 `aseprite-m102`。

1. 從 [Releases · aseprite/skia](https://github.com/aseprite/skia/releases) 下載已經建置好的套件（`Skia-macOS-Release-arm64.zip`）。
2. `mkdir -p $HOME/deps/skia` 創建資料夾。
3. `unzip Skia-macOS-Release-arm64.zip -d $HOME/deps/skia` 解壓縮。

## 安裝 Mac 所需套件

需要的 Mac 套件有：
1. Xcode
2. MacOS SDK

從 App Store 下載 Xcode 並開啟，按照指示安裝 MacOS SDK 即可。

## 編譯

### 下載原始碼

找到一個合適的資料夾後下載原始碼。

```sh
git clone --recursive https://github.com/aseprite/aseprite.git
```

> `--recursive` 會一併下載在其他 repo 的 dependency。

### 創建建置資料夾

創建建置資料夾的目的是：如果想要重新建置程式的話，只需要清空建置資料夾即可。

```sh
cd aseprite
mkdir build
```

### 開始建置

進入建置資料夾：

```sh
cd build
```

使用 CMake 建置：

```sh
cmake \
  -DCMAKE_BUILD_TYPE=RelWithDebInfo \
  -DCMAKE_OSX_ARCHITECTURES=arm64 \
  -DCMAKE_OSX_DEPLOYMENT_TARGET=11.0 \
  -DCMAKE_OSX_SYSROOT=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk \
  -DLAF_BACKEND=skia \
  -DSKIA_DIR=$HOME/deps/skia \
  -DSKIA_LIBRARY_DIR=$HOME/deps/skia/out/Release-arm64 \
  -DSKIA_LIBRARY=$HOME/deps/skia/out/Release-arm64/libskia.a \
  -DPNG_ARM_NEON:STRING=on \
  -G Ninja \
  ..
```

其中有一些參數要注意：
1. `DCMAKE_OSX_SYSROOT`：MacOS SDK 的路徑。
2. `DSKIA_*`：Skia 的解壓縮路徑如果有變更，參數也要修改。
3. `..`：不是省略，是父目錄的意思，因為程式碼都在父目錄。

使用 Ninja 建置：

```sh
ninja aseprite
```

## 做成應用程式

建置完後，打開 `aseprite/build/bin/aseprite` 就可以使用 Aseprite 了。為了讓我們編譯的 Aseprite 更有應用程式的感覺，我們可以將這些檔案打包成一個 `.app` 檔，和啟動台裡面的程式一樣美觀又方便。

1. 建立資料夾 `Aseprite.app`，若跳出視窗，選擇將副檔名加入結尾。
2. 把 `aseprite/build/bin` 內的所有檔案加入 `Aseprite.app`。
3. 右鍵 `Aseprite.app` 取得資訊。
4. 把 `aseprite/data/icons/ase.ico` 這個圖示拉到 `Aseprite.app` 資訊框左上角的圖示欄位，以更換圖示。
5. 最後把 `Aseprite.app` 放進應用程式資料夾，即可從啟動台中開啟。
