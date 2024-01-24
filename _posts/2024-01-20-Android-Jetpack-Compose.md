---
layout: post
title: "Android Jetpack Compose"
author: "NatsuCamellia"
categories: Journal
tags: [Android]
---

Android Jetpack 是 Google 開發用來製作 Android 應用程式的現代函式庫，核心思想是：

1. 降低程式碼數量以提升工作效率
2. 減少錯誤異常
3. 專注於設計應用程式

此外，在 Android Jetpack 的[官方網站](https://developer.android.com/jetpack?hl=zh-tw)也有詳細且豐富的教學與範例，網站的設計美觀且簡約，有興趣可以參考。

## Compose

Compose 公布於 2019 年，正式發布於 2021 年 7 月，是 Jetpack 中用於 Android UI 設計的函式庫。Compose 捨棄早期使用的 XML，改使用較現代的聲明式 UI（Declarative UI）。

以下簡單比較 XML 與 Compose 製作 `Hello World!` 文字方塊的程式碼。

```xml
<!-- Android UI in XML -->
<TextView
    android:text="Hello World!"
></TextView>
```

```kotlin
// Android UI in Compose
Text(
    text = "Hello World!"
)
```

相較於使用 XML，聲明式 UI 更加簡潔、不易出錯，並且能降低程式碼數量，使開發者更能專注於程式本身的功能性，而非花費大量時間除錯。因此聲明式 UI 被視為是應用程式開發的未來。

在 Compose 之前，由 Meta 於 2015 年發布的 React Native 以及由 Google 於 2017 年發布的 Flutter，兩者皆採用了聲明式 UI 且皆為用來開發跨平台應用程式的套件，因此聲明式 UI 不是非常創新的作法。

## Kotlin

Compose 必須搭配 Kotlin 語言使用。Kotlin 是由 JetBrains 於 2016 年正式發布的 JVM 語言，原先是希望 Kotlin 能增加自家 IDE IntelliJ IDEA 的銷售量。而 Google 在隔年的開發者大會 Google I/O 上宣布，Kotlin 成為 Android 的官方開發語言，並且 Google 會為 Kotlin 提供最佳的支援。

在這之前，Android 的開發語言是 Java，而如今 Kotlin 取代 Java 成為官方語言，並不代表開發者只能從兩門程式語言中選擇一門使用，而是得益於兩者皆為 JVM 語言而可以同時搭配使用。熟悉 Java 的開發者可以逐漸將程式碼替換為 Kotlin，不必一次替換所有程式碼。

Google 選擇 Kotlin 是因為 Kotlin 簡潔的語法（相較於 Java 簡潔許多），更重要的是 Kotlin 的 Null Safety 解決了長期困擾 Java 開發者的 `NullPoinerException`。

接觸了 Kotlin 之後，我認同 Kotlin 是簡潔又好用的語言。而我近期在 YouTube 上找到了關於 Kotlin 這個語言的顏值展示：

<iframe width="100%" height="400" src="https://www.youtube.com/embed/iTy13tsi054?si=f45TORRifX6IOC7z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 學習

若想要學習使用 Jetpack Compose 開發 Android 應用程式，可以參考 Android Developers 的[官方網站](https://developer.android.com/?hl=zh-tw)。不過網站的編排方式我個人認為很混亂，時常找不到想要的資訊，因此我將學習資源列在下方：

- [單元 1：您的第一個 Android 應用程式](https://developer.android.com/courses/android-basics-compose/unit-1?hl=zh-tw)
- [單元 2：建構應用程式使用者介面](https://developer.android.com/courses/android-basics-compose/unit-2?hl=zh-tw)
- [單元 3：顯示清單並使用質感設計](https://developer.android.com/courses/android-basics-compose/unit-3?hl=zh-tw)
- [單元 4：導覽和應用程式架構](https://developer.android.com/courses/android-basics-compose/unit-4?hl=zh-tw)
- [單元 5：連線至網際網路](https://developer.android.com/courses/android-basics-compose/unit-5?hl=zh-tw)
- [單元 6：資料持續性](https://developer.android.com/courses/android-basics-compose/unit-6?hl=zh-tw)
- [單元 7：WorkManager](https://developer.android.com/courses/android-basics-compose/unit-7?hl=zh-tw)
- [單元 8：Compose 搭配 View](https://developer.android.com/courses/android-basics-compose/unit-8?hl=zh-tw)

一開始講解 Kotlin 的部分很簡單；中期開始編排版面配置與樣式時很有成就感，因為聲明式 UI 讓我可以用簡潔的程式碼做出好看的 UI，加上內建的 Material Design 讓我不用擔心字體、顏色等外觀設計；到了後期就會出現一些用不到的功能，此時學習的興致就會比較低落。

我覺得這一系列的教學編排地很好，不但資訊量適中，在每個單元結束前都會有個小專案來讓學習者動手實作。實作時需按照教學的要求做出應用程式，就像是為一個真實的使用者開發一樣，實際做出來之後會非常有成就感。