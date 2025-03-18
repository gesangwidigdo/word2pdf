# Word2PDF Converter

Simple tool to convert `.docx`, `.doc`, or other MS Word files to PDF file using LibreOffice (`soffice`)

## Requirement

To run or deploy this tool, do the following instruction:

- Install [LibreOffice](https://www.libreoffice.org/download/download-libreoffice/) on your machine or server

- Clone this repository

- Install dependencies

  ```npm
  npm install
  ```

- Start the server

  ```npm
  npm run dev
  ```

> **Note**: Due to conversion using **LibreOffice**, the generated PDF file may have **different fonts or format** than the original document.