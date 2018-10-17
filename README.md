# Build process
build.(js|ts)
* Deve accettare in ingresso i parametri:
  * --version
  * --skip-test
* Esamina la cartellina /projects
* Per ogni folder, prendere il nome ed eseguire gli scripts:
  * `npm run test <FOLDER_NAME>`
  * sostituire nel package.json `"version": "0.0.0-PLACEHOLDER"` con `"version": "<VERSION_PARAMS>"`
  * `npm run build <FOLDER_NAME>`
* alla fine di tutti i processi di test/build creare un file package.json che abbia come struttura interna solo:
```json
{
  "name": "@qwentes/agnostic",
  "version": "<VERSION_PARAMS>"
}
```
e salvarlo come file di primo livello dentro la cartellina /dist
