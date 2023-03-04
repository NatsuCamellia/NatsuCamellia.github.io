---
layout: post
title: "Java Thread"
---

> 當本文使用 Thread 時，指的是 Thread 這個類別，而非執行緒。

執行緒是 Java 中重要的一環，可以讓我們的程式分成不同部分（看起來）同時運行。建立執行緒有兩種方式，第一種是直接繼承 Thread ，而另一種則是實作 Runnable 。

## 繼承 Thread
繼承 Thread 的話只要覆寫 run() 方法就可以了，可以在 run() 中放入任何想要做的事。
例如我想要印出一些數字，並在之間 sleep() 一秒鐘：
```java
public class MyThread extends Thread { 
    @Override  
    public void run() {  
        for (int i = 0; i < 5; i++) {  
            System.out.println(i);
  
            try {  
                sleep(1000);  
            } catch (InterruptedException e) {  
                throw new RuntimeException(e);  
            }  
        }  
    }  
}
```
要讓這個執行緒開始跑，並不是呼叫 run() ，而是呼叫 start() ，因為呼叫 run() 並不會建立一個新的執行緒。
```java
public class Main {  
    public static void main(String[] args) { 
		MyThread thread = new MyThread();
		thread.start();
    }  
}
```

## 實作 Runnable
Runnable 介面只有一個方法 run() ，因此實作時和繼承 Thread 時一樣：
```Java
public class MyRunnable implements Runnable { 
    @Override  
    public void run() {  
        for (int i = 0; i < 5; i++) {  
            System.out.println(i);
        }  
    }  
}
```
現在它還不是一個可以跑的執行緒，要先呼叫 Thread 的建構子，並把 MyRunnable 當作參數建立一個 Thread 。
```Java
public class Main {  
    public static void main(String[] args) { 
		MyRunnable runnable = new MyRunnable();
		Thread thread = new Thread(runnable);
		thread.start();
    }  
}
```

## Runnable 與 Thread
那麼到底該**實作 Runnable** 還是**繼承 Thread** 呢？
Thread 實作了 Runnable ，並新增了許多方法如 wait(), sleep() 等，但是使用實作 Runnable 的方法最終還是會建立一個 Thread ，所以一樣可以用到 Thread 的方法。此外，由於 Java 不允許**多重繼承**，因此實作 Runnable 的好處是不會佔用繼承的位置。
總而言之，能用 Runnable 就盡量用吧！