import React from "react";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import numberToWords from "number-to-words";

const PdfComponent = ({ factureId,quantity, associationName, associationCode }) => {
    
  const puHT = 4.07;
  const montantHT = quantity * puHT;
  const tva = montantHT * 0.07;
  const totalTTC = montantHT + tva;

  const styles = {
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      padding: 10,
      width: "100%", 
      height: "297mm", 
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
    section: {
      margin: 10,
      padding: 10,
      paddingLeft:40,
      flexDirection: "column",
      width: "100%", 
    },
    
    leftTopSection: {

      justifyContent: "center",
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    leftBottomSection: {
      marginTop: 0,

    },
    centerSection: {
      textAlign: "center",
      flexGrow: 1,
      paddingLeft:3,
    },
    header: {
      fontSize: 14,
      marginBottom: 10,
      textDecoration: "underline",
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
      
    },
    text2: {
      fontSize: 7.5,
      marginBottom: 5,
      
    },
    table: {
      width: "100%", 
      border: "1px solid #000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      flex: 2,
      borderRight: "1px solid #000",
      borderBottom: "1px solid #000",
      padding: 4,
    },
    biggerTableCell: {
      flex: 8,
      borderRight: "1px solid #000",
      borderBottom: "1px solid #000",
      padding: 4,
    },
    colspan2: {
      flex: 2 * 2 + 8.7,
      borderRight: "1px solid #000",
      borderBottom: "1px solid #000",
      padding: 4,
    },
  };
  const moisActuel = new Date().toLocaleString("fr-FR", { month: "long" });
  const anneeActuel = new Date().getFullYear();
  const numberToWordsFR = (number) => {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];
    function convertToWords(n) {
      if (n === 0) return '';
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) {
        const remainder = n % 10;
        const ten = tens[Math.floor(n / 10)];
        return remainder === 0 ? ten : ten + '-' + units[remainder];
      }
      if (n < 1000) {
        const hundreds = units[Math.floor(n / 100)];
        const remainder = n % 100;
        return remainder === 0 ? hundreds + ' cents' : hundreds + ' cents ' + convertToWords(remainder);
      }
      if (n < 100000) {
        const thousandsPart = Math.floor(n / 1000);
        const remainderPart = n % 1000;
        const thousandsWords = thousandsPart === 1 ? 'mille' : convertToWords(thousandsPart) + ' mille';
        const remainderWords = convertToWords(remainderPart);
        return thousandsWords + (remainderPart !== 0 ? ' ' + remainderWords : '');
      }
      return '';
    }
    const parts = number.toString().split('.');
    const integerPart = parseInt(parts[0]);
    const decimalPart = parseInt(parts[1]) || 0;
    const integerWords = convertToWords(integerPart);
    let decimalWords = '';
    if (decimalPart > 0) {
      decimalWords = 'virgule ';
      if (decimalPart < 10) {
        decimalWords += convertToWords(decimalPart);
      } else {
        decimalWords += convertToWords(Math.floor(decimalPart / 10) * 10);
        const remainder = decimalPart % 10;
        if (remainder !== 0) {
          decimalWords += '-' + convertToWords(remainder);
        }
      }
    }
    const result = integerWords + (integerWords !== '' ? ' ' : '') + decimalWords;
    return result || 'zéro';
  };
  const word = numberToWordsFR(totalTTC.toFixed(2));
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={{ ...styles.section, ...styles.leftTopSection,width:"300px" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>ROYAUME DU MAROC</Text>
              <Text style={styles.text2}>OFFICE NATIONALE DE L'ELECTRICITE ET DE L'EAU POTABLE - ONEE</Text>
              <Text style={styles.text}>BRANCHE EAU</Text>
              <Text style={styles.text}>AGENCE MIXTE AZILAL</Text>
            </View>
            </View>
            <View style={{ ...styles.section, ...styles.leftBottomSection }}>
              <Text style={styles.text}>C.C.P 35 08 10 00 00 00 00 01 39 75 21 47</Text>
              <Text style={styles.text}>C.A.M. AZILAL 22 50 70 01 47 04 63 46 51 01 12 19</Text>
              <Text style={styles.text}>Tél : 05-23-45-96-55</Text>
              <Text style={styles.text}>Fax: 05-23-45-81-94</Text>
              <Text style={styles.text}>N° Identifiant fiscal : 40486450</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ ...styles.section, ...styles.centerSection }}>
              <Text style={styles.header}>FACTURE N° {factureId} ASSO / AM3 / 2 / {anneeActuel}</Text>
              <Text style={styles.text}>à rappeler au paiement</Text>
              <Text style={styles.text}>DOIT POUR FOURNITURE D'EAU POUR LE MOIS DE: {moisActuel}</Text>
              <Text style={styles.text}>SUIVANT RELEVE DES COMPTEURS DE : {associationName}</Text>
              <Text style={styles.text}>CODE CDP : {associationCode} C</Text>
            </View>
          </View>
          <View style={{...styles.container, width:"500px"}}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.biggerTableCell}>
                  <Text style={styles.text}>Designation</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>Quantite en M3</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>P.U HT EN DH</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>Montant HT EN DH</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.biggerTableCell}>
                  <Text style={styles.text}>Fourniture de l'eau potable (cubage mensuel)</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>{quantity}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>{puHT.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>{montantHT.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.colspan2}>
                  <Text style={styles.text}>TVA 7%</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.text}>{tva.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.colspan2}>
                  <Text style={styles.text}>TOTAL GENERAL TTC</Text>
                </View>
                <View style={{ ...styles.tableCell, alignItems: "flex-start" }}>
                  <Text style={styles.text}>{totalTTC.toFixed(2)}</Text>
                </View>
              </View>
              </View>
            </View>
            <Text style={styles.text}>ARRETEE LA PRESENTE FACTURE A LA SOMME DE : {word}</Text>
          </View>
          <View style={{ ...styles.section, ...styles.centerSection, alignItems: "center" }}>
            <Text style={styles.text}>A AZILAL LE: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <PDFViewer width="100%" height={800}>
      {MyDocument}
    </PDFViewer>
  );
};
export default PdfComponent;
