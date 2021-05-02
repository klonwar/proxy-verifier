# Proxy Verifier

## Описание
Программа проверяет все прокси, отправляя через них запрос на указанный вами сайт

## Запуск
Вызовите `npm run exe`, чтобы создать exe файл. Запустите его из командной строки с нужными аргументами

```
./proxy-verifier.exe -u "https://google.com" -i input_proxies.txt -o output_proxies.txt -t 2000
```

Валидные прокси запишутся в `output_proxies.txt`