# Rishry - Shopify theme

## Use Shopify CLI

### ディレクトリ構成

```
├── htdocs                                            //dest ディレクトリ( static )
├── pug                                               //static develop ディレクトリ
├── scss                                              //develop styleing 
├── theme                                             //theme for Shopify
└── theme_export__rishry-com-boost-commerce-live-theme-with-filter-search-1__25NOV2021-0357pm //開発中テーマ
    ├── 
```

### Shopify CLI

テーマ新規インストール

``` $ shopoify theme init [テーマの名前]
$ shopoify theme init [テーマの名前]
```

起動

1. ターミナルで、インストールしたテーマディレクトリに移動
2. shopify login –store https://example.myshopify.com/ で目的のストアにログイン
3. ` shopify theme serve `でローカル内で環境立ち上げ
4. ターミナル内に ` Viewing theme… ` という枠線で囲まれたURL情報が出力されるので、必要に応じてテーマにアクセスする
5. 作業を終えたり休止したりする場合は、` Ctrl+C ` でtheme serveを止める 

### テーマアップロード

``` // いきなり公開テーマとして登録
$ shopify theme push　--publish
// 未公開テーマとしてテーマライブラリ内に登録
$ shopify theme push　--unpublished
```

