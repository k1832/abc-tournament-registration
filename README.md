# what is this?
AtCoder Beginner Contestトーナメント（以下ABCT）の登録をやってくれます。  

 **※使用は自己責任でお願いします。**  
 **※開発時、私がABCTに登録済みだったため最後までテストできていません。**  
 
ABCT登録時の以下のようなフローを自動でやってくれます。  
1. ABCTにAtCoderのIDを入力して登録ボタンを押下
2. AtCoderでの所属を表示された文字列に変更
3. ABCTに戻って確認ボタンを押下
4. （AtCoderの所属を元に戻す）

# versions
- node: 15.6.0
- npm: 7.4.0

# how to run
1. ソースコードをクローン  
`git clone https://github.com/k1832/abc-tournament-registration.git`  
2. フォルダを移動  
`cd abc-tournament-registration`  
3. 依存関係をインストール  
`npm i`  
4. ユーザ情報を準備（コマンド入力後に、 **.env** の内容を自分のIDとパスワードに変更してください。）  
`mv .env.sample .env`  
5. 実行  
`node index.js`  
