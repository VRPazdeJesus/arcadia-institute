# arcadia-institute
Aplicativo para a Arcadia Institute, para apresentar os produtos da empresa.
- Tecnologia: Ionic v4
- Desenvolvedor: Víctor Romário Paz de Jesus
- Início: Agosto 2019

### Simulador do App para iOS e Android
```
ionic serve -l android ios
```

### Removendo plugins no projeto: remover do cordova e do ionic
```
cordova plugin remove nome-plugin
npm uninstall nome-plugin
```

### Gerando versão de debug para celular
```
ionic cordova build android --debug
```

### Remover e adicionar a plataforma Android, caso o Build dê falha
```
ionic cordova platform rm android
ionic cordova platform add android
```

### Gerar uma versão para release do app
```
ionic cordova build --release android
```

### Gerar certificado para o projeto e este sempre ser usado em todas assinaturas do app
senha: Victor2019.@
```
keytool -genkey -v -keystore ddnews.keystore -alias ddnews -keyalg RSA -keysize 2048 -validity 10000
```


### Assinar o app com o certificado gerado
senha: Victor2019.@
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ddnews.keystore platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk ddnews
```

### Empacotar o app com o zipalign. O executável do zipalign está dentro do SDK do Android Studio. Copia e cola o executável dentro da pasta build do projeto Ionic
```
platforms\android\app\build\outputs\apk\zipalign -v 4 platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk ddnews.apk
```

