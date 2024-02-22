---
layout: post
title: "Java 序列化"
categories: Java
description: "如何把 Java 的資料從記憶體中存到硬碟內"
---

當類別實作 `java.io.Serializable` 後，物件就可以被輸出到檔案中，稱為序列化。同樣也可以被讀取，稱為反序列化。

## 序列化
1. 用 FileOutputStream 開啟檔案
2. 用 ObjectOutputStream 將物件寫入 FileOutputStream

``` Java
FileOutputStream fos = new FileOutputStream("filename");
ObjectOutputStream oos = new ObjectOutputStream(fos);

oos.writeObject(object);
oos.flush(); // 立刻寫入檔案
oos.close();
```

## 反序列化
反序列化和序列化過程類似：
1. 用 FileInputStream 開啟檔案
2. 用 ObjectInputStream 從 FileInputStream 讀取物件

``` Java
FileInputStream fis = new FileInputStream("filename");
ObjectInputStream ois = new ObjectInputStream(fis);

Object object = ois.readObject(object);
ois.close();
```

## 自訂序列化
關於序列化有些小細節：
1. 物件裡的 Field 若沒有實作 Serializable 會導致物件無法序列化
2. 序列化時，有 static 或 transient 修飾詞的 Field 不會被寫入檔案

若想要將這些 Field 序列化，可以透過實作 Serializable 的方法來自訂序列化：
``` Java
public class Student implements Serializable {
	private static final long serialVersionUID = 1L;

	private void writeObject(ObjectOutputStream oos) 
		throws IOException {
		oos.defaultWriteObject();
		oos.writeObject(grade.getChinese());
	}
	
	private void readObject(ObjectInputStream ois) 
		throws IOException, ClassNotFoundException {
		ois.defaultReadObject();
		grade = new Grade((int) ois.readObject());
	}
}
```

defaultWriteObject 和 defaultReadObject 是預設的序列化，後面就是自訂序列化了，把想要做的通通都寫在裡面就可以了。

## SerialVersionUID
在上面的例子中，我為 Student 這個類別加入了 SerialVersionUID ，這個 UID 是用來驗證輸出和讀取的物件是指定的類別，若不是則會拋出 InvalidClassException 。

一般而言，IDE 會自動生成 UID ，若沒有指定 UID 則會由 JVM 指定。但是推薦手動指定，因為 UID 可能會因為編譯器而不同，導致產生 InvalidClassException 。