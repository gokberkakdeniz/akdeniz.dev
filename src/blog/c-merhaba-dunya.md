---
title: "C Programlama Dili: Terimler ve Merhaba Dünya (Turkish)"
date: 2019-11-20
description: IZTECH IEEE ComSoc C Kursu 2019-2020 - Terimler ve Merhaba Dünya
tags: blog-hidden
---

!["Merhaba, dünya" bilgisayar programı (Brian Kernighan)](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Hello_World_Brian_Kernighan_1978.jpg/440px-Hello_World_Brian_Kernighan_1978.jpg)

"Merhaba, dünya" bilgisayar programı ([Brian Kernighan](https://www.wikiwand.com/en/Brian_Kernighan))

## Terimler
- `Algoritma` belli bir problemi çözmek veya belirli bir amaca ulaşmak için tasarlanan yol. (Örnek: Bir sayının çift mi tek mi olduğunu kontrol etmek)
- `Bilgisayar programı` bilgisayara belirli bir işlemi ya da işlemleri gerçekleştirebilmek için verilen komut ya da komutlar bütünüdür. (Örnek: Mozilla Firefox, Google Chrome, WhatsApp, Microsoft Windows 10, Linux vs.)
- `Derleyici (Compiler)` belli bir programlama dilinde yazılmış kaynak kodunu başka bir dile (genellikle makine dili) çeviren bilgisayar programıdır.
- `Kaynak Kodu (Source Code)` bir programlama dilinde yazılmış kodlar ve yorumlar bütünüdür. (Örnek: Paylaştığımız "c" uzantılı dosyalar.)
- `Kütüphane (Library)` belli bir işi yapan bir araya toplanmış, başka programlar tarafından kullanılabilen kod bütünü. 
- `Programlama Dili` yazılımcının bir algoritmayı ifade etmek amacıyla, bir bilgisayara ne yapmasını istediğini anlatmasının tektipleştirilmiş yoludur. (Örnek: C, C++, C#, Java, Python, Assembly vb.)
- `Yorum (Comment)` programın çalışmasını etkilemeyen, derleyici tarafından göz ardı edilen fakat kaynak kodunun insanlar tarafından kolayca okunup anlaşılmasını sağlayan kısımdır.
- `Üst Bilgi Dosyası (Header File)` dosyaları `#include` ile kaynak koduna eklendiğinde derleyici tarafından eklendiği yere içeriği kopyalanır. Bu dosyalar "h" uzantısına sahiptir. C'de kütüphane dosyaları olarak kullanılır.

## Merhaba, dünya!

```c
#include <stdio.h>

/* Bu çok satırlı
bir 
yorumdur...

    İstediğin    gibi           yazabilir-
sin.*/

int main() {
    printf("Merhaba, dunya!"); // Bu bir tek satırlı yorumdur.

    return 0;
}
```

Satır satır incelersek:
- `#include <stdio.h>` _printf_ komutunu kullanmamız için _stdio (Standart Input and Output)_ kütüphanesini programımıza ekledik.
- `/* Bu çok satırlı` __/*__ karakterlerinden sonraki her şey derleyici tarafından göz ardı edilecek,
- ..
- `sin.*/` ta ki __*/__ görülene kadar.
- `int main() {` burası programımızın çalıştırıldığı kısım. Aslında bu "main" ismine sahip bir fonksiyon. Matematikteki fonksiyonlara benziyor genel olarak aslında. Nasıl bir fonksiyonun tanım aralığı ve görüntü kümesi varsa, bizim de çıktının türünü derleyiciye söylememiz gerekiyor. Tahmin ettiğiniz gibi türümüz "int" yani tam sayı. En sonda gördüğünüz süslü parantez ise blok başlagıncını temsil ediyor. Bloklar bizim içine kodumuzu yazdığımız kısım kabaca bir tabirle. Gövde de denebilir.
- `printf("Merhaba, dunya!"); // Bu bir tek satırlı yorumdur.` kısmı ise printf fonksiyonunu çalıştırıyor. Yorum kısmı ise derleyici tarafından göz ardı ediliyor. 
- `return 0;` Fonksiyonlardan bahsetmiştik, tahmin edeceğiniz gibi fonksiyonumuzun çıktı olarak bir şey vermesi gerekiyor. Biz daha önce "main" fonksiyonumuzun dönüt tipine "int" demiştik. Neden 0 döndürdüğümüzü düşünebilirsiniz. 0 ile sonlanan programlar işletim sistemi tarafından sorunsuzca çalıştı olarak algılanır. Bunun dışındaki her sayı değer başarısızdır. Eğer dikkatlı baktıysanız 2 seferdir kodumuzun sonunda ";" işaretini görmüşsündür. Bu her fonksiyon çağrısından sonra kullanılması gereken bir dil kuralıdır.
- `}` daha önce açtığımız bloğumuzu kapatıyoruz.
