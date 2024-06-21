# Hava Durumu Uygulaması (Weather App)

## Proje Hakkında

Bu proje, kullanıcıların anlık, günlük ve haftalık hava durumu bilgilerini almasını sağlayan kapsamlı bir hava durumu uygulamasıdır. Ayrıca, kullanıcılar harita entegrasyonu sayesinde istedikleri lokasyon hakkında bilgi alabilir ve şehirler hakkında yorum yapabilirler. Admin paneli, kullanıcı yönetimi ve blog oluşturma gibi ek özellikler sunmaktadır.

## Özellikler

1. **Anlık, Günlük ve Haftalık Hava Durumu Bilgisi**: Kullanıcılar, şehir ismi girerek detaylı hava durumu bilgilerine ulaşabilirler.
2. **Harita Entegrasyonu**: OpenLayer kütüphanesi kullanılarak yapılan harita entegrasyonu sayesinde, haritadan tıklanan lokasyon hakkında hava durumu bilgileri alınabilir.
3. **Hava Durumu Grafikleri**: Şehir ismi girerek sıcaklık, nem gibi verileri grafik olarak görüntüleyebilirsiniz.
4. **Konum Bazlı Hava Durumu**: Kullanıcılar konum izni verdiklerinde, bulundukları lokasyona göre hava durumu bilgilerini anlık, günlük ve haftalık olarak alabilirler.
5. **Şehir Yorumları**: Kullanıcılar şehirler hakkında yorum yapabilirler.
6. **Kullanıcı Giriş ve Kayıt**: Kullanıcılar ve adminler için giriş yapma ve kayıt olma bölümleri bulunmaktadır.
7. **Profil Düzenleme**: Kullanıcılar ve adminler profillerini istedikleri gibi düzenleyebilirler.
8. **Admin Paneli**:
   - **Blog Yönetimi**: Blog ekleyebilir, düzenleyebilir ve silebilirler.
   - **Şehir Yönetimi**: Şehir ekleyebilir, düzenleyebilir ve silebilirler.
   - **Kullanıcı Yönetimi**: Kullanıcıları yönetebilir, hesapları silebilir ve düzenleyebilirler.
   - **Yorum Yönetimi**: Yorumları görebilir ve silebilirler.
   - **Grafikler**: Kullanıcılar, bloglar ve yorumlar hakkında toplam, bugün eklenen, son 1 haftada eklenen ve son 1 ayda eklenenlerin grafikleri bulunmaktadır.
9. **Geri Bildirim Formu**: Kullanıcılar uygulama hakkında görüşlerini yazarak geri bildirim formunu doldurabilirler. Bu veriler belirlenen mail adresine iletilir.

## Teknolojiler

- **Angular**
- **RxJS**
- **OpenLayer**
- **PrimeNG**
- **Chart.js**
- **Python**
- **Flask**

## Kurulum ve Başlatma

1. Projeyi klonlayın:

```sh
   git clone https://github.com/Harlexq/weather-app.git
   cd .\client\
```

2. Gerekli modülleri indirin:

```sh
    npm install
```

3. Gerekli modülleri indirin:

```sh
   npm run start
```

4. Uygulama, 3500 portunda çalışmaya başlayacaktır.

## Kullanım

### Hava Durumu Bilgisi Alma

- **Şehir İsmine Göre:** Şehir ismi girerek anlık, günlük ve haftalık hava durumu bilgilerini alabilirsiniz.
- **Harita Entegrasyonu:** Haritadan bir lokasyona tıklayarak o bölge hakkında hava durumu bilgisi alabilirsiniz.
- **Konum Bazlı:** Konum izni vererek bulunduğunuz lokasyonun hava durumu bilgilerini görüntüleyebilirsiniz.

### Hava Durumu Grafikleri

- Şehir ismi girerek sıcaklık, nem gibi verileri grafik üzerinde görüntüleyebilirsiniz.

### Yorum Yapma

- Şehirler hakkında yorum yapabilirsiniz.

### Admin Paneli

- **Blog Yönetimi:** Blog ekleme, düzenleme ve silme işlemlerini gerçekleştirebilirsiniz.
- **Şehir Yönetimi:** Şehir ekleme, düzenleme ve silme işlemlerini gerçekleştirebilirsiniz.
- **Kullanıcı Yönetimi:** Kullanıcıları yönetebilir, hesapları silebilir ve düzenleyebilirsiniz.
- **Yorum Yönetimi:** Yorumları görebilir ve silebilirsiniz.
- **Grafikler:** Kullanıcılar, bloglar ve yorumlar hakkında çeşitli grafiklerle bilgi alabilirsiniz.

### Geri Bildirim Formu

- Kullanıcılar uygulama hakkında görüşlerini geri bildirim formu aracılığıyla belirlenen mail adresine iletebilirler.

## Katkıda Bulunma

Proje katkılarına açıktır. Lütfen katkıda bulunmak için bir pull request gönderin veya bir issue açın.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](./LICENSE) dosyasına bakın.
