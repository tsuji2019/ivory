## Usage

### Command

#### Install

```
npm install
```

#### Develop

```
npm run dev
```

#### Build

```
npm run build
```

## 機能一覧

### Node Ver.
10.15.3

### 開発環境

-   gulp
-   pug
-   webpack
-   babel
-   sass
-   eslint
-   prettier

### ライブラリ

-   jQuery
-   swiper

### meta の一括生成

-   `<meta>`は`_src/_data/meta.json`にて管理
-   `pug`の`pageId`で`ID`を指定して、`meta.json`で編集

```
block var
  - pageId = "index"
```
