import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const styles = {
  pageLandscape: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    margin: 0,
    padding: 0,
  },
  tableHeader: {
    fontSize: 6,
  },
};

function PdfRcap({ factures, selectedMonth, selectedYear }) {
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    if (!pdfGenerated && !pdfGenerating) {
      setPdfGenerating(true);
      generatePdf();
    }
  }, [pdfGenerated, pdfGenerating]);

  const generatePdf = () => {
    const doc = new jsPDF("landscape");

    const headers = [
      "Centre",
      "Nom de l'Association",
      "Total a payer TTC",
      "Vente Eau HT",
      "Vente Eau TTC",
      "SURT. SOLD HT",
      "SURT. SOLD TTC",
      "Redevances Prélèvement HT",
      "Redevances Prélèvement TTC",
      "SURT. PAGE HT",
      "SURT. PAGE TTC",
      "TVA 7%",
      "Produit HT",
      "Produit TTC",
      "Quantité",
      "",
      "Code Association",
    ];

    const tableData = [];
    let totalQuantity = 0;
    let totalVenteEauHT = 0;
    let totalVenteEauTTC = 0;
    let totalSurtSoldHT = 0;
    let totalSurtSoldTTC = 0;
    let totalRedevancesPrelevementHT = 0;
    let totalRedevancesPrelevementTTC = 0;
    let totalSurtPageHT = 0;
    let totalSurtPageTTC = 0;
    let totalTva7 = 0;
    let totalProduitHT = 0;
    let totalProduitTTC = 0;
    let totaltotalAPayerHT =0;
    let totaltotalAPayerTTC =0;

    factures.forEach((facture) => {
      const {
        centre,
        associationName,
        associationCode,
        quantity,
      } = facture;

      const venteEauHT = quantity * 4.07;
      const venteEauTTC = venteEauHT * 1.07;
      const surtSoldHT = quantity * 0.85;
      const surtSoldTTC = surtSoldHT * 1.07;
      const redevancesPrelevementHT = quantity * 0.03;
      const redevancesPrelevementTTC = redevancesPrelevementHT * 1.07;
      const surtPageHT = quantity * 0.14;
      const surtPageTTC = surtPageHT * 1.07;
      const tva7 = venteEauHT * 0.07;
      const produitHT = quantity * 4.07;
      const produitTTC = produitHT * 1.07;
      const totalAPayerHT = venteEauHT + surtSoldHT + redevancesPrelevementHT + surtPageHT + produitHT;
      const totalAPayerTTC = venteEauTTC + surtSoldTTC + redevancesPrelevementTTC + surtPageTTC + produitTTC;

      const rowData = [
        centre,
        associationName,
        totalAPayerHT.toFixed(2),
        venteEauHT.toFixed(2),
        venteEauTTC.toFixed(2),
        surtSoldHT.toFixed(2),
        surtSoldTTC.toFixed(2),
        redevancesPrelevementHT.toFixed(2),
        redevancesPrelevementTTC.toFixed(2),
        surtPageHT.toFixed(2),
        surtPageTTC.toFixed(2),
        tva7.toFixed(2),
        produitHT.toFixed(2),
        produitTTC.toFixed(2),
        quantity,
        totalAPayerTTC.toFixed(2),
        associationCode,
      ];

      tableData.push(rowData);
      totalVenteEauHT += venteEauHT;
      totalVenteEauTTC += venteEauTTC;
      totalSurtSoldHT += surtSoldHT;
      totalSurtSoldTTC += surtSoldTTC;
      totalRedevancesPrelevementHT += redevancesPrelevementHT;
      totalRedevancesPrelevementTTC += redevancesPrelevementTTC;
      totalSurtPageHT += surtPageHT;
      totalSurtPageTTC += surtPageTTC;
      totalTva7 += tva7;
      totalProduitHT += produitHT;
      totalProduitTTC += produitTTC;
      totalQuantity += quantity;
      totaltotalAPayerHT += totalAPayerHT;
      totaltotalAPayerTTC += totalAPayerHT;
    });
    const totalRow = [
      "Total",
      "",
      totaltotalAPayerHT.toFixed(2),
      totalVenteEauHT.toFixed(2),
      totalVenteEauTTC.toFixed(2),
      totalSurtSoldHT.toFixed(2),
      totalSurtSoldTTC.toFixed(2),
      totalRedevancesPrelevementHT.toFixed(2),
      totalRedevancesPrelevementTTC.toFixed(2),
      totalSurtPageHT.toFixed(2),
      totalSurtPageTTC.toFixed(2),
      totalTva7.toFixed(2),
      totalProduitHT.toFixed(2),
      totalProduitTTC.toFixed(2),
      totalQuantity.toFixed(2),
      totaltotalAPayerTTC.toFixed(2),
      "",
    ];

    tableData.push(totalRow);

    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const month = monthNames[selectedMonth-1]; 
    const year = selectedYear; 

    doc.setFontSize(10);
    doc.text(` ${month} - ${year}`, 10, 10);
    doc.text(`VENTE D'EAU-ASSOCIATION`, 130,10);

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 20,
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        tableWidth: "auto",
      },
      columnStyles: {
        1: { cellWidth: 30 },
      },
      headStyles: {
        fontSize: 6,
      },
    });

    doc.save("factures.pdf");
    setPdfGenerated(true); 
    setPdfGenerating(false);
  };

 return (
    <div>
      {pdfGenerated ? (
        <p>PDF Récapitulatif des Factures généré avec succès!</p>
      ) : (
        <p>Génération du PDF en cours...</p>
      )}
      <p>{selectedMonth} - {selectedYear}</p>
    </div>
  );
}

export default PdfRcap;
