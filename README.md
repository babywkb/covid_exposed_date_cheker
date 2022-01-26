# covid_exposed_date_cheker
node script for get covid exposed date
only in Japan
only for iOS

iOSの接触通知ログを保存しこのスクリプトを通すことでコロナ感染者と接触した推定日付(接触候補日)を簡単に確認することができます。
このスクリプトで表示される接触候補日は「接触シート別冊」にて示されている接触候補日データを取得した結果です。

## Caution!!
this script scrape from [「接触シート別冊」](https://datastudio.google.com/u/0/reporting/069598a2-3f01-4b51-b023-cdb478992182/page/blffB)
this website run by volunteers.
Do Not use repatedly in short time.

このスクリプトは[「接触シート別冊」](https://datastudio.google.com/u/0/reporting/069598a2-3f01-4b51-b023-cdb478992182/page/blffB)というウェブサイトをスクレピングする作りになっています。
こちらはボランティアによって稼働しているウェブサイトです。
決して短時間で何度もこのスクリプトを利用してウェブサイトに迷惑をかけることをしないでください。

## How to use
[ココアログチェッカー]((https://cocoa-log-checker.com/))のiOS編を参考に自身の接触通知ログを取得してください。
Macユーザーの場合、AirDropかHandoff機能を利用すると便利です。

取得した接触通知ログファイルを[/data](/data)ディレクトリに格納してください。

格納した接触通知ログファイル名を保存してください。

```node index 格納したファイル名``` で実行可能です。(拡張子jsonも含めてください)
#### example
``` 
node index.js ExposureChecks-2022-01-24.json
```

`"接触推定日": " 一致データなし"`と表示されるケースは「接触シート別冊」に初期表示される一覧の中に対応するHASH値が無いことを意味します。
その場合でも「接触シート別冊」内の検索窓にHASH値を入れて検索することで接触推定日を知ることができます。


## How does this work

「接触シート別冊」ウェブサイトから取得したハッシュ値とiPhoneから取得した接触通知ログのHASH値を突合し、「接触シート別冊」に表示されている接触候補日をログに表示します。
