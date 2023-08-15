---
layout: post
title: "Java Collection"
author: "NatsuCamellia"
categories: Java
---

只會用 Array 嗎？在程式設計中有個專業知識稱為「資料結構」，資料結構可以幫助我們有效率地存取資料。Java Collections 框架就是為此而生，提供了各種實用的功能！

Java Collections 有兩個主要的介面，分別為 Collection 與 Map ，前者將大量型態相同的元素裝在一起，後者則是儲存多對 Entry（Key-Value），用 Key 來存取 Value，本篇著重介紹 Collection 。

## Collection 介面

Colletion 是 Java 中實作**集合**的介面，宣告了集合所具備的基本方法：

- `add(T element)`
- `remove(T element)`
- `size()`
- `isEmpty()`
- `contains(T element)`
- ...

所有子介面都擁有這些方法，以下介紹三個子介面：

---

## **1. List**

List 以**索引**來排序元素，可以如陣列存取元素，在 Collection 之外新增了一些有關索引的方法：

- `get(int index)`
- `set(int index, T element)`
- `indexOf(T element)`

實作的類別有：

### LinkedList

LinkedList 會在每個元素中紀錄下一個元素的位址。存取時需要從頭遍歷，因此存取中間元素的速度**相對**慢。但增減時只要更改下一個元素的位址即可，所以增減中間元素的速度**相對**快。

### ArrayList

ArrayList 和 Array 最大的不同是：ArrayList 可以**動態調整**大小，可以增加或減少元素數量。

---

## **2. Set**

Set 的特色是不允許有重複的元素，元素之間沒有順序，可用的方法大多已定義在 Collection 中，這裡不多解釋。

實作的類別有：

### HashSet

HashSet 透過 HashMap 實現，擁有快速的存取速度。

### LinkedHashSet

基於 HastSet 之上，LinkedHashSet 還會維持元素新增時的順序。

### TreeSet

TreeSet 會依物件的比較結果來排序元素，但每個元素都必須實作 Comparable 介面才能進行排序。

---

## **3. Queue**

Queue 是一種特殊的線性資料結構，如字面上的意思，就和排隊一樣，具有 First in, First out (FIFO) 的特性，它只能對頭進行刪除、對尾進行插入。

### Queue 介面方法（建議）

對頭操作，當 Queue 為空時會回傳 `null` ：

- `poll()`：刪除第一個元素並回傳。
- `peek()`：查看第一個元素並回傳。

對尾操作，當 Queue 滿時回傳 `false` ：

- `offer()`：插入一個元素到尾端。

### Collection 內建方法（不建議）

對頭操作，當 Queue 為空時會拋出 Exception ：

- `remove()`：相當於 `poll()`。
- `element()`：相當於 `peek()`。

對尾操作，當 Queue 滿時拋出 unchecked Exception ：

- `add()`：相當於 `offer()`。

實作 Queue 的子類別有：

### LinkedList

沒錯，就是上面的 LinkedList ，它也有實作 Queue ，可以當 Queue 用！

### PriorityQueue (Interface)

PriorityQueue 可以想像成 Heap，每個元素都有自己的優先度，取出元素時會是優先度最高的元素，因此不具備 FIFO 的特質。此外，為了讓 Queue 比較元素間的優先度，元素必須實作 Comparable 介面，或是在宣告 Queue 的時候加入 Comparator 。

### BlockingQueue (Interface)

BlockingQueue 除了實作 Queue 的基本功能，還有**阻塞**功能，意思就是說：當我們要從 Queue 中拿一個元素，但是卻**沒有元素**可以拿時，這個執行緒就會**停下來**，直到有元素可以拿為止。有四個方法有阻塞的功能：

1. `take()` ：拿元素，沒元素拿就**等到有為止**。
2. `put()` ：插入元素，沒空間放就**等到有為止**。
3. `poll(timeout, unit)` ：拿元素，沒元素拿就等**指定時長**直到有元素。
4. `offer(timeout, unit)` ：插入元素，沒空間放就等**指定時長**直到有空間。

BlockingQueue 可以運用在生產與消費中：

- `take()` ：消費者購買商品，當商品數量不足時就一直等到生產者做出來為止。
- `put()` ：生產者製造商品，當商品數量達到上限時就一直等到消費者買為止。

### PriorityBlockingQueue

繼承了上面兩個介面，PriorityQueue 和 BlockingQueue 。