# codeceptjs-playground

[CodeceptJS](https://codecept.io/)の機能を一通り使ってみたサンプル

ブラウザは最も手軽なpuppeteerを使用する。

動作確認: nodejs 10

使用している機能

- AutoLogin
  - [codecept.conf.js](./codecept.conf.js)の```plugins.autoLogin```
- RetryFailedStep
  - [codecept.conf.js](./codecept.conf.js)の```plugins.retryFailedStep```
- Retry
  - [tests/pc/github_public_test.js](./tests/pc/github_public_test.js)
- PageObject
  - [pages/top.js](./pages/top.js)
- CustomSteps
  - [steps_file.js](./steps_file.js)
- DataTable
  - [github_datatable_test.js](./tests/pc/github_datatable_test.js)
- Paralleal
  - [codecept.conf.js](./codecept.conf.js)の```multiple```
- JUnit Reporter
  - [codecept.conf.js](./codecept.conf.js)の```mocha.mocha-junit-reporter```
- Allure Reporter
  - [codecept.conf.js](./codecept.conf.js)の```plugins.allure```

# Setup
```console
npm i

# Allureのレポート機能を使用する場合
# Macはbrewでインストール可能
# それ以外の場合はAllureのドキュメント参照: https://docs.qameta.io/allure/
brew install allure

# GitHubにログインが必要なテストを実行する場合
export USERNAME=****
export PASSWORD=****

```

# 環境変数
- USERNAME: GitHubのログインに使用するユーザー名
- PASSWORD: GitHubのログインに使用するパスワード
- DEBUG: 値を何か入れるとヘッドレスモードがオフになり、実行中のブラウザ画面が表示される

# Test
## ローカル環境用
```console
npm run test
```

基本の設定

- ヘッドレス: True
- デバッグログ: False
- 並列数: 1


## デバッグ用
```console
npm run test:debug
```

新しいテストを作成するときなど、動作確認に必要な各種設定をONにしたもの

- ヘッドレス: False
- デバッグログ: True
- 並列数: 1

## 並列実行
```console
npm run test:parallel
```

ブラウザを2つ立ち上げて並列にテストを実行する。  
このリポジトリでは本物のGitHubにアクセスするため、並列に実行するとbot判定されやすくなることでテストが失敗しやすくなることに注意。

- ヘッドレス: True
- デバッグログ: True
- 並列数: 2

## Allure用の実行
Allureのレポートが正しく生成されるように```npm run test```の実行前と実行後に各種操作を行っている。

詳しくは後述のAllureの項目を参照

## CI環境用
```console
npm run test:junit
```

```npm test run```と同じ設定だが、JUnitのXMLを```./output/result.xml```に出力する。

JenkinsやCircleCIではテスト実行結果のXMLを保存することでテストの実行時間や、失敗したテストの可視化などの機能を提供してくれる。

また、AutoLogin機能によって通常は保存されるGitHubのログインセッション情報はCI環境に残すとセキュリティ的に問題となるため、CI環境では保存されないようにしている。

# Report
## Allure
CodeceptJSはOSSの高機能テストレポーターである[Allure](http://allure.qatools.ru/)形式のテストレポートを出力する機能が存在する。  

```console
npm run test:allure # テスト実行とAllureのレポートを正しく生成するための工程を行う
```

### History
Allureは過去の実行記録を保存しておくことでテスト時間の推移や過去に失敗したテストケースを表示するHistory機能が存在する。  
Historyの機能を有効化するには過去に作成した```allure-report/history/```をコピーしてから```allure generate```実行する必要があり、```npm run report```をそれを実行している。

### Retry
Allureは同じテストケースのxmlが複数存在する場合、そのテストケースをリトライしたと判定する。  
そのため、テストが実行されるごとにoutput/に蓄積されるAllure用のxmlを放置してしまうと次回のテスト実行後にレポートを作成するとき、前回実行分の記録がリトライとして誤って判定されてしまう。

これを防ぐために```npm run test:allure```では前回実行時の`output/`を削除してからテストを実行している。

# CI
[CircleCI用の設定](./.circleci/config.yml)

テスト失敗したときのスクショは`store_artifacts`でCircleCIに保存する。  
JUnit形式のテストレポートを作成し、`store_test_results`でテスト結果もCircleCIに保存している。


# LICENSE
MIT