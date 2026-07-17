(function () {
  var KEY = 'ptk_lang';

  var DICT = {
    en: {
      common: {
        copied: 'Copied to clipboard.',
        cameraFailed: 'Camera access failed:',
        cameraNotSupported: 'Camera API not supported in this browser.',
        error: 'Error:',
        shareBtn: '📤 Share',
        shareFailed: 'Could not share:',
        toggleTheme: 'Toggle theme',
        language: 'Language',
        swap: 'Swap'
      },
      index: {
        title: 'Phone Utility Toolkit',
        subtitle: '10 handy tools, all running locally in your browser.',
        footer: 'All tools run entirely on-device. Camera, microphone and sensor access is requested only when you open a tool. Best experienced in Chrome for Android; some features are limited on iOS Safari (noted in each tool).',
        cards: {
          scanDocument: { label: 'Scan Document', sub: 'Camera + auto-enhance' },
          ocr: { label: 'OCR Image to Text', sub: 'Extract text from photos' },
          voiceToText: { label: 'Voice to Text', sub: 'Live speech transcription' },
          textToSpeech: { label: 'Text to Speech', sub: 'Read text out loud' },
          qrScanner: { label: 'QR Scanner', sub: 'Scan QR codes instantly' },
          barcodeScanner: { label: 'Barcode Scanner', sub: 'EAN, UPC, Code128 & more' },
          qrGenerator: { label: 'QR Code Generator', sub: 'Create QR codes to share' },
          cameraMirror: { label: 'Camera Mirror', sub: 'Front/back live mirror' },
          unitConverter: { label: 'Unit Converter', sub: 'Length, weight, temp & more' },
          passwordGenerator: { label: 'Password Generator', sub: 'Strong passwords, on-device' }
        }
      },
      scanDocument: {
        header: 'Scan Document', statusInit: 'Tap "Start Camera" to begin.', startBtn: 'Start Camera',
        captureBtn: '📸 Capture', retakeBtn: 'Retake', enhanceOn: 'Enhance: On', enhanceOff: 'Enhance: Off',
        downloadBtn: 'Save Image',
        hint: 'Uses your rear camera to capture a page, then applies a grayscale + contrast "scan" filter. Tap Enhance to toggle the effect, then save the result to your device.',
        statusReady: 'Camera ready. Line up the document and capture.', statusCaptured: 'Captured. Toggle enhance or save.'
      },
      ocr: {
        header: 'OCR Image to Text', statusInit: 'Choose or capture a photo with text.', takePhoto: '📷 Take Photo',
        chooseImage: '🖼️ Choose Image', extractBtn: 'Extract Text', outputLabel: 'Recognized Text',
        outputPlaceholder: 'Extracted text will appear here…', copyBtn: 'Copy Text', clearBtn: 'Clear',
        hint: 'Text recognition runs in your browser using Tesseract.js (loaded from a CDN, so an internet connection is required the first time). Works best on clear, well-lit, upright text.',
        statusReady: 'Image ready. Tap "Extract Text".', engineNotLoaded: 'OCR engine not loaded. Check your internet connection.',
        statusDone: 'Done. Text extracted below.', ocrFailed: 'OCR failed:'
      },
      voiceToText: {
        header: 'Voice to Text', statusInit: 'Tap the mic to start speaking.', transcriptLabel: 'Transcript',
        transcriptPlaceholder: 'Your speech will appear here…', langLabel: 'Recognition Language',
        copyBtn: 'Copy Text', clearBtn: 'Clear',
        hint: 'Uses the Web Speech API for continuous, on-the-fly transcription. Best supported in Chrome for Android/Desktop. Safari/iOS support is limited or unavailable.',
        notSupported: 'Speech recognition is not supported in this browser. Try Chrome on Android/Desktop.',
        listening: 'Listening…', stopped: 'Stopped. Tap the mic to start speaking.'
      },
      textToSpeech: {
        header: 'Text to Speech', statusInit: 'Type or paste text, choose a language, and tap Speak.', textLabel: 'Text',
        textPlaceholder: 'Type something to hear it read aloud…', langLabel: 'Language',
        detectBtn: '🔍 Detect Language', speakBtn: '▶️ Speak', pauseBtn: '⏸️ Pause', resumeBtn: '⏵ Resume', stopBtn: '⏹️ Stop',
        hint: 'Uses the built-in Web Speech Synthesis API. Pick a language (or tap Detect Language to guess it from your text), then tap Speak. Available languages depend on your device and browser.',
        notSupported: 'Speech synthesis is not supported in this browser.', enterTextFirst: 'Enter some text first.',
        speaking: 'Speaking…', finished: 'Finished speaking.', paused: 'Paused.', stoppedMsg: 'Stopped.',
        noVoiceForLang: 'No voice installed for this language on your device; it may still work using the browser default.',
        detected: 'Detected language:', detectFailed: "Couldn't confidently detect the language — please choose manually."
      },
      qrScanner: {
        header: 'QR Scanner', statusInit: 'Tap "Start Camera" to scan a QR code.', startBtn: 'Start Camera',
        resultLabel: 'Decoded Result', openBtn: 'Open Link', copyBtn: 'Copy', scanAgainBtn: 'Scan Again',
        hint: 'Decoding happens locally in your browser (jsQR, loaded from a CDN). Point your rear camera at a QR code and hold steady.',
        scanning: 'Scanning… point at a QR code.', detected: 'QR code detected.'
      },
      barcodeScanner: {
        header: 'Barcode Scanner', statusInit: 'Tap "Start Camera" to scan a barcode.', startBtn: 'Start Camera',
        resultLabel: 'Last Detected', formatPrefix: 'Format:', copyBtn: 'Copy', scanAgainBtn: 'Scan Again',
        hint: "Uses the browser's native Barcode Detection API — supports EAN-13/8, UPC-A/E, Code128, Code39, ITF, Codabar and QR. Currently available in Chrome for Android and most Chromium browsers; not supported in Safari/iOS or Firefox.",
        notSupported: 'Barcode Detection API not supported in this browser. Try Chrome on Android, or use the QR Scanner tool for QR codes.',
        scanning: 'Scanning… point at a barcode.', detected: 'Barcode detected.'
      },
      qrGenerator: {
        header: 'QR Code Generator', statusInit: 'Type text or a URL, then generate a QR code.',
        textLabel: 'Text or URL', textPlaceholder: 'Type or paste text, a link, Wi-Fi info, etc…',
        generateBtn: 'Generate QR Code', downloadBtn: 'Save Image', copyBtn: 'Copy Text', clearBtn: 'Clear',
        hint: 'Generates a QR code entirely on-device using the qrcode-generator library (loaded from a CDN). Works offline afterwards — great for sharing links, Wi-Fi passwords, or contact info.',
        statusGenerated: 'QR code generated below.', enterTextFirst: 'Enter some text first.',
        tooLong: 'Text is too long to encode as a QR code. Try shortening it.',
        engineNotLoaded: 'QR engine not loaded. Check your internet connection.'
      },
      cameraMirror: {
        header: 'Camera Mirror', statusInit: 'Tap "Start" for a live mirror view.', startBtn: 'Start', restartBtn: 'Restart',
        switchBtn: '🔄 Switch Camera', brightnessLabel: 'Brightness:', contrastLabel: 'Contrast:',
        hint: 'Live camera feed shown mirrored, like a physical mirror. Adjust brightness/contrast for better visibility. Switch between front and rear cameras if your device has both.',
        active: 'Live mirror active.'
      },
      unitConverter: {
        header: 'Unit Converter', categoryLabel: 'Category', fromLabel: 'From', toLabel: 'To',
        valueLabel: 'Value', resultLabel: 'Result', swapBtn: '🔄 Swap', copyBtn: 'Copy Result',
        hint: 'Converts common units entirely on-device — length, weight, temperature, volume, area, and speed.',
        categories: { length: 'Length', weight: 'Weight', temperature: 'Temperature', volume: 'Volume', area: 'Area', speed: 'Speed' }
      },
      passwordGenerator: {
        header: 'Password Generator', lengthLabel: 'Length', uppercaseLabel: 'Uppercase (A-Z)',
        lowercaseLabel: 'Lowercase (a-z)', numbersLabel: 'Numbers (0-9)', symbolsLabel: 'Symbols (!@#$…)',
        excludeAmbiguousLabel: 'Exclude ambiguous characters (l, 1, I, O, 0)',
        generateBtn: '🎲 Generate Password', copyBtn: 'Copy',
        hint: "Generates passwords locally using your browser's secure random number generator (crypto.getRandomValues) — nothing is sent anywhere.",
        statusInit: 'Choose your options and tap Generate.', statusGenerated: 'Password generated.',
        selectOneType: 'Select at least one character type.',
        strengthWeak: 'Weak', strengthFair: 'Fair', strengthGood: 'Good', strengthStrong: 'Strong'
      }
    },

    ja: {
      common: {
        copied: 'クリップボードにコピーしました。',
        cameraFailed: 'カメラへのアクセスに失敗しました:',
        cameraNotSupported: 'このブラウザではカメラAPIがサポートされていません。',
        error: 'エラー:',
        shareBtn: '📤 共有',
        shareFailed: '共有できませんでした:',
        toggleTheme: 'テーマを切り替え',
        language: '言語',
        swap: '入れ替え'
      },
      index: {
        title: 'スマホ便利ツールキット',
        subtitle: '10種類の便利なツールを、すべてブラウザ上でローカルに実行。',
        footer: 'すべてのツールは端末上で完結します。カメラ・マイク・センサーへのアクセスは、各ツールを開いたときのみ要求されます。Android版Chromeでの利用を推奨。iOS Safariでは一部機能が制限されます(各ツール内に記載)。',
        cards: {
          scanDocument: { label: '書類スキャン', sub: 'カメラ+自動補正' },
          ocr: { label: 'OCR 画像→テキスト', sub: '写真から文字を抽出' },
          voiceToText: { label: '音声→テキスト', sub: 'リアルタイム音声認識' },
          textToSpeech: { label: 'テキスト→音声', sub: '文章を読み上げ' },
          qrScanner: { label: 'QRスキャナー', sub: 'QRコードを瞬時に読み取り' },
          barcodeScanner: { label: 'バーコードスキャナー', sub: 'EAN、UPC、Code128 など' },
          qrGenerator: { label: 'QRコード生成', sub: 'QRコードを作成して共有' },
          cameraMirror: { label: 'カメラミラー', sub: '前面/背面のライブ鏡' },
          unitConverter: { label: '単位変換', sub: '長さ・重さ・温度など' },
          passwordGenerator: { label: 'パスワード生成', sub: '端末上で強力なパスワードを作成' }
        }
      },
      scanDocument: {
        header: '書類スキャン', statusInit: '「カメラ起動」をタップして開始します。', startBtn: 'カメラ起動',
        captureBtn: '📸 撮影', retakeBtn: '撮り直す', enhanceOn: '補正: オン', enhanceOff: '補正: オフ',
        downloadBtn: '画像を保存',
        hint: '背面カメラで書類を撮影し、グレースケール+コントラストの「スキャン風」フィルターを適用します。「補正」で効果を切り替え、結果を端末に保存できます。',
        statusReady: 'カメラ準備完了。書類を画面に合わせて撮影してください。', statusCaptured: '撮影しました。補正の切り替えや保存ができます。'
      },
      ocr: {
        header: 'OCR 画像→テキスト', statusInit: '文字が写った写真を選択または撮影してください。', takePhoto: '📷 写真を撮る',
        chooseImage: '🖼️ 画像を選ぶ', extractBtn: '文字を抽出', outputLabel: '認識されたテキスト',
        outputPlaceholder: '抽出されたテキストがここに表示されます…', copyBtn: 'テキストをコピー', clearBtn: 'クリア',
        hint: '文字認識はブラウザ内でTesseract.js(CDNから読み込み、初回はインターネット接続が必要)を使って実行されます。はっきりと明るく、まっすぐな文字が最も認識しやすいです。',
        statusReady: '画像の準備ができました。「文字を抽出」をタップしてください。', engineNotLoaded: 'OCRエンジンが読み込まれていません。インターネット接続を確認してください。',
        statusDone: '完了しました。抽出されたテキストは下に表示されています。', ocrFailed: 'OCRに失敗しました:'
      },
      voiceToText: {
        header: '音声→テキスト', statusInit: 'マイクをタップして話し始めてください。', transcriptLabel: '文字起こし',
        transcriptPlaceholder: '話した内容がここに表示されます…', langLabel: '認識言語',
        copyBtn: 'テキストをコピー', clearBtn: 'クリア',
        hint: 'Web Speech APIを使って、連続的にリアルタイムで文字起こしを行います。Android/デスクトップ版Chromeで最も安定して動作します。Safari/iOSでは対応が限定的、または未対応です。',
        notSupported: 'このブラウザは音声認識に対応していません。Android/デスクトップのChromeをお試しください。',
        listening: '聞き取り中…', stopped: '停止しました。マイクをタップして話し始めてください。'
      },
      textToSpeech: {
        header: 'テキスト→音声', statusInit: 'テキストを入力し、言語を選んで「再生」をタップしてください。', textLabel: 'テキスト',
        textPlaceholder: '読み上げたい文章を入力…', langLabel: '言語',
        detectBtn: '🔍 言語を検出', speakBtn: '▶️ 再生', pauseBtn: '⏸️ 一時停止', resumeBtn: '⏵ 再開', stopBtn: '⏹️ 停止',
        hint: '端末内蔵のWeb Speech Synthesis APIを使用します。言語を選択するか、「言語を検出」をタップして文章から自動判定できます。その後「再生」をタップしてください。利用可能な言語は端末とブラウザによって異なります。',
        notSupported: 'このブラウザは音声合成に対応していません。', enterTextFirst: '先にテキストを入力してください。',
        speaking: '再生中…', finished: '再生が終了しました。', paused: '一時停止しました。', stoppedMsg: '停止しました。',
        noVoiceForLang: 'この言語の音声が端末に見つからない場合がありますが、ブラウザの既定の音声で再生を試みます。',
        detected: '検出された言語:', detectFailed: '言語を確実に判定できませんでした。手動で選択してください。'
      },
      qrScanner: {
        header: 'QRスキャナー', statusInit: '「カメラ起動」をタップしてQRコードをスキャンします。', startBtn: 'カメラ起動',
        resultLabel: '解析結果', openBtn: 'リンクを開く', copyBtn: 'コピー', scanAgainBtn: 'もう一度スキャン',
        hint: 'デコードはブラウザ内(CDNから読み込んだjsQR)で行われます。背面カメラをQRコードに向けて、しっかり構えてください。',
        scanning: 'スキャン中… QRコードに向けてください。', detected: 'QRコードを検出しました。'
      },
      barcodeScanner: {
        header: 'バーコードスキャナー', statusInit: '「カメラ起動」をタップしてバーコードをスキャンします。', startBtn: 'カメラ起動',
        resultLabel: '最後に検出した結果', formatPrefix: '形式:', copyBtn: 'コピー', scanAgainBtn: 'もう一度スキャン',
        hint: 'ブラウザ標準のBarcode Detection APIを使用しています。EAN-13/8、UPC-A/E、Code128、Code39、ITF、Codabar、QRに対応。現在はAndroid版Chromeなど主要なChromium系ブラウザで利用可能で、Safari/iOSやFirefoxでは非対応です。',
        notSupported: 'このブラウザはBarcode Detection APIに対応していません。Android版Chromeをお試しいただくか、QRコードにはQRスキャナーをご利用ください。',
        scanning: 'スキャン中… バーコードに向けてください。', detected: 'バーコードを検出しました。'
      },
      qrGenerator: {
        header: 'QRコード生成', statusInit: 'テキストやURLを入力してQRコードを生成します。',
        textLabel: 'テキストまたはURL', textPlaceholder: 'テキスト、リンク、Wi-Fi情報などを入力…',
        generateBtn: 'QRコードを生成', downloadBtn: '画像を保存', copyBtn: 'テキストをコピー', clearBtn: 'クリア',
        hint: 'QRコードはCDNから読み込んだqrcode-generatorライブラリを使い、端末上で生成されます。生成後はオフラインでも利用可能です。リンクやWi-Fiパスワード、連絡先の共有に便利です。',
        statusGenerated: 'QRコードを下に生成しました。', enterTextFirst: '先にテキストを入力してください。',
        tooLong: 'テキストが長すぎてQRコードにエンコードできません。短くしてお試しください。',
        engineNotLoaded: 'QRエンジンが読み込まれていません。インターネット接続を確認してください。'
      },
      cameraMirror: {
        header: 'カメラミラー', statusInit: '「開始」をタップしてライブミラー表示を始めます。', startBtn: '開始', restartBtn: '再起動',
        switchBtn: '🔄 カメラ切替', brightnessLabel: '明るさ:', contrastLabel: 'コントラスト:',
        hint: 'ライブカメラ映像を鏡のように反転して表示します。明るさ/コントラストを調整して見やすくできます。前面/背面カメラを切り替えることもできます。',
        active: 'ライブミラー動作中。'
      },
      unitConverter: {
        header: '単位変換', categoryLabel: 'カテゴリー', fromLabel: '変換元', toLabel: '変換先',
        valueLabel: '数値', resultLabel: '結果', swapBtn: '🔄 入れ替え', copyBtn: '結果をコピー',
        hint: '長さ、重さ、温度、体積、面積、速度など、よく使う単位を端末上で変換します。',
        categories: { length: '長さ', weight: '重さ', temperature: '温度', volume: '体積', area: '面積', speed: '速度' }
      },
      passwordGenerator: {
        header: 'パスワード生成', lengthLabel: '長さ', uppercaseLabel: '大文字 (A-Z)',
        lowercaseLabel: '小文字 (a-z)', numbersLabel: '数字 (0-9)', symbolsLabel: '記号 (!@#$…)',
        excludeAmbiguousLabel: '紛らわしい文字を除外 (l, 1, I, O, 0)',
        generateBtn: '🎲 パスワードを生成', copyBtn: 'コピー',
        hint: 'ブラウザの安全な乱数生成機能(crypto.getRandomValues)を使い、端末上でパスワードを生成します。どこにも送信されません。',
        statusInit: 'オプションを選んで「生成」をタップしてください。', statusGenerated: 'パスワードを生成しました。',
        selectOneType: '少なくとも1つの文字種を選択してください。',
        strengthWeak: '弱い', strengthFair: '普通', strengthGood: '良い', strengthStrong: '強い'
      }
    },

    zh: {
      common: {
        copied: '已复制到剪贴板。',
        cameraFailed: '摄像头访问失败:',
        cameraNotSupported: '此浏览器不支持摄像头 API。',
        error: '错误:',
        shareBtn: '📤 分享',
        shareFailed: '无法分享:',
        toggleTheme: '切换主题',
        language: '语言',
        swap: '交换'
      },
      index: {
        title: '手机实用工具箱',
        subtitle: '10 款实用工具,全部在浏览器本地运行。',
        footer: '所有工具均完全在本地设备上运行。仅在打开工具时才会请求摄像头、麦克风和传感器权限。推荐使用 Android 版 Chrome 获得最佳体验;iOS Safari 上部分功能受限(各工具页面已注明)。',
        cards: {
          scanDocument: { label: '文档扫描', sub: '摄像头+自动增强' },
          ocr: { label: '图片文字识别 (OCR)', sub: '从照片中提取文字' },
          voiceToText: { label: '语音转文字', sub: '实时语音转录' },
          textToSpeech: { label: '文字转语音', sub: '朗读文本内容' },
          qrScanner: { label: '二维码扫描', sub: '即时扫描二维码' },
          barcodeScanner: { label: '条形码扫描', sub: '支持 EAN、UPC、Code128 等' },
          qrGenerator: { label: '二维码生成', sub: '创建二维码以便分享' },
          cameraMirror: { label: '美容镜', sub: '前/后置摄像头实时镜像' },
          unitConverter: { label: '单位换算', sub: '长度、重量、温度等' },
          passwordGenerator: { label: '密码生成器', sub: '本地生成高强度密码' }
        }
      },
      scanDocument: {
        header: '文档扫描', statusInit: '点击「启动摄像头」开始。', startBtn: '启动摄像头',
        captureBtn: '📸 拍摄', retakeBtn: '重新拍摄', enhanceOn: '增强:开', enhanceOff: '增强:关',
        downloadBtn: '保存图片',
        hint: '使用后置摄像头拍摄页面,然后应用灰度+对比度的「扫描」滤镜。点击「增强」可切换效果,再将结果保存到设备。',
        statusReady: '摄像头已就绪,将文档对准画面后拍摄。', statusCaptured: '已拍摄。可切换增强效果或保存。'
      },
      ocr: {
        header: '图片文字识别 (OCR)', statusInit: '选择或拍摄一张含有文字的照片。', takePhoto: '📷 拍照',
        chooseImage: '🖼️ 选择图片', extractBtn: '提取文字', outputLabel: '识别结果',
        outputPlaceholder: '提取的文字将显示在这里…', copyBtn: '复制文字', clearBtn: '清除',
        hint: '文字识别通过 Tesseract.js 在浏览器中本地运行(从 CDN 加载,首次使用需要联网)。文字清晰、光线充足、方向端正时识别效果最佳。',
        statusReady: '图片已就绪,点击「提取文字」。', engineNotLoaded: 'OCR 引擎未加载,请检查网络连接。',
        statusDone: '完成,识别的文字见下方。', ocrFailed: 'OCR 识别失败:'
      },
      voiceToText: {
        header: '语音转文字', statusInit: '点击麦克风开始说话。', transcriptLabel: '转录文本',
        transcriptPlaceholder: '您说的内容将显示在这里…', langLabel: '识别语言',
        copyBtn: '复制文字', clearBtn: '清除',
        hint: '使用 Web Speech API 进行连续实时转录。在 Android/桌面版 Chrome 上支持最佳,Safari/iOS 支持有限或不支持。',
        notSupported: '此浏览器不支持语音识别,请尝试 Android/桌面版 Chrome。',
        listening: '正在聆听…', stopped: '已停止。点击麦克风开始说话。'
      },
      textToSpeech: {
        header: '文字转语音', statusInit: '输入或粘贴文字,选择语言后点击「朗读」。', textLabel: '文字',
        textPlaceholder: '输入想要朗读的内容…', langLabel: '语言',
        detectBtn: '🔍 检测语言', speakBtn: '▶️ 朗读', pauseBtn: '⏸️ 暂停', resumeBtn: '⏵ 继续', stopBtn: '⏹️ 停止',
        hint: '使用内置的 Web Speech Synthesis API。选择语言(或点击「检测语言」从文本自动判断),然后点击「朗读」。可用语言因设备和浏览器而异。',
        notSupported: '此浏览器不支持语音合成。', enterTextFirst: '请先输入文字。',
        speaking: '正在朗读…', finished: '朗读完成。', paused: '已暂停。', stoppedMsg: '已停止。',
        noVoiceForLang: '您的设备上可能没有该语言的语音,将尝试使用浏览器默认语音朗读。',
        detected: '检测到的语言:', detectFailed: '无法确定文本语言,请手动选择。'
      },
      qrScanner: {
        header: '二维码扫描', statusInit: '点击「启动摄像头」扫描二维码。', startBtn: '启动摄像头',
        resultLabel: '识别结果', openBtn: '打开链接', copyBtn: '复制', scanAgainBtn: '再次扫描',
        hint: '解码完全在浏览器本地进行(使用从 CDN 加载的 jsQR)。将后置摄像头对准二维码并保持稳定。',
        scanning: '正在扫描…请对准二维码。', detected: '已检测到二维码。'
      },
      barcodeScanner: {
        header: '条形码扫描', statusInit: '点击「启动摄像头」扫描条形码。', startBtn: '启动摄像头',
        resultLabel: '最近识别结果', formatPrefix: '格式:', copyBtn: '复制', scanAgainBtn: '再次扫描',
        hint: '使用浏览器原生的 Barcode Detection API,支持 EAN-13/8、UPC-A/E、Code128、Code39、ITF、Codabar 和二维码。目前仅在 Android 版 Chrome 及大多数 Chromium 浏览器中可用,Safari/iOS 和 Firefox 不支持。',
        notSupported: '此浏览器不支持 Barcode Detection API。请尝试 Android 版 Chrome,或使用二维码扫描工具扫描二维码。',
        scanning: '正在扫描…请对准条形码。', detected: '已检测到条形码。'
      },
      qrGenerator: {
        header: '二维码生成', statusInit: '输入文字或网址,生成二维码。',
        textLabel: '文字或网址', textPlaceholder: '输入文字、链接、Wi-Fi 信息等…',
        generateBtn: '生成二维码', downloadBtn: '保存图片', copyBtn: '复制文字', clearBtn: '清除',
        hint: '二维码通过从 CDN 加载的 qrcode-generator 库在本地生成,生成后可离线使用。适合分享链接、Wi-Fi 密码或联系方式。',
        statusGenerated: '二维码已生成,见下方。', enterTextFirst: '请先输入文字。',
        tooLong: '文字过长,无法编码为二维码,请尝试缩短内容。',
        engineNotLoaded: 'QR 引擎未加载,请检查网络连接。'
      },
      cameraMirror: {
        header: '美容镜', statusInit: '点击「开始」进入实时镜像画面。', startBtn: '开始', restartBtn: '重新开始',
        switchBtn: '🔄 切换摄像头', brightnessLabel: '亮度:', contrastLabel: '对比度:',
        hint: '以镜像方式显示实时摄像头画面,如同真实的镜子。可调整亮度/对比度以获得更清晰的视野。若设备支持,也可在前后摄像头之间切换。',
        active: '实时镜像运行中。'
      },
      unitConverter: {
        header: '单位换算', categoryLabel: '类别', fromLabel: '从', toLabel: '到',
        valueLabel: '数值', resultLabel: '结果', swapBtn: '🔄 交换', copyBtn: '复制结果',
        hint: '在本地转换常用单位,包括长度、重量、温度、体积、面积和速度。',
        categories: { length: '长度', weight: '重量', temperature: '温度', volume: '体积', area: '面积', speed: '速度' }
      },
      passwordGenerator: {
        header: '密码生成器', lengthLabel: '长度', uppercaseLabel: '大写字母 (A-Z)',
        lowercaseLabel: '小写字母 (a-z)', numbersLabel: '数字 (0-9)', symbolsLabel: '符号 (!@#$…)',
        excludeAmbiguousLabel: '排除易混淆字符 (l, 1, I, O, 0)',
        generateBtn: '🎲 生成密码', copyBtn: '复制',
        hint: '使用浏览器安全的随机数生成功能(crypto.getRandomValues)在本地生成密码,不会发送到任何地方。',
        statusInit: '选择选项后点击「生成」。', statusGenerated: '密码已生成。',
        selectOneType: '请至少选择一种字符类型。',
        strengthWeak: '弱', strengthFair: '一般', strengthGood: '良好', strengthStrong: '强'
      }
    }
  };

  var SUPPORTED = ['en', 'ja', 'zh'];
  var LABELS = { en: 'EN', ja: '日本語', zh: '中文' };

  function detectDefault() {
    var stored = localStorage.getItem(KEY);
    if (stored && DICT[stored]) return stored;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('zh') === 0) return 'zh';
    return 'en';
  }

  var currentLang = detectDefault();

  function lookup(lang, key) {
    var node = DICT[lang];
    var parts = key.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function t(key) {
    var val = lookup(currentLang, key);
    if (val === undefined) val = lookup('en', key);
    return val === undefined ? key : val;
  }

  function applyI18n() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-placeholder'));
      if (val != null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-aria'));
      if (val != null) el.setAttribute('aria-label', val);
    });
  }

  function buildSwitcher() {
    var sel = document.getElementById('langSelect');
    if (!sel) return;
    sel.innerHTML = '';
    SUPPORTED.forEach(function (code) {
      var opt = document.createElement('option');
      opt.value = code;
      opt.textContent = LABELS[code];
      if (code === currentLang) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', function () { setLang(sel.value); });
  }

  function setLang(lang) {
    if (!DICT[lang]) return;
    currentLang = lang;
    localStorage.setItem(KEY, lang);
    applyI18n();
    var sel = document.getElementById('langSelect');
    if (sel) sel.value = lang;
    document.dispatchEvent(new CustomEvent('ptk-lang-changed', { detail: { lang: lang } }));
  }

  // Keep other open tabs in sync when the language is switched in one of them.
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && e.newValue && e.newValue !== currentLang) setLang(e.newValue);
  });

  window.Ptk = window.Ptk || {};
  window.Ptk.t = t;
  window.Ptk.setLang = setLang;
  window.Ptk.getLang = function () { return currentLang; };

  document.addEventListener('DOMContentLoaded', function () {
    buildSwitcher();
    applyI18n();
  });
})();
