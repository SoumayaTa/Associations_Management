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
    fontSize: 15,
  },
};

function PdfReleve({ factures, selectedMonth, selectedYear }) {
  const [pdfGenerated, setPdfGenerated] = useState(false);


  useEffect(() => {
    if (!pdfGenerated ) {
      
      generatePdf();
    }
  }, [pdfGenerated]);

  const generatePdf = () => {
    const doc = new jsPDF("");

    const headers = [
      "Centre",
      "Nom de l'Association",
      "Ancien Index",
      "Nouveau Index",
      "Consommation",
      "Estimation",
    ];

    const tableData = [];
    let totalQuantity = 0;

    factures.forEach((facture) => {
      const {
        centre,
        associationName,
        newIndex,
        oldIndex,
        
        quantity,
        estimation,
      } = facture;

      const rowData = [
        centre,
        associationName,
        newIndex,
        oldIndex,
        quantity,
        estimation,
      ];

      tableData.push(rowData);
      totalQuantity += quantity;
    
    });
    const totalRow = [
      "Total",
      "",
      "",
      "",
      totalQuantity.toFixed(2),
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

    doc.setFontSize(15);
    doc.text(`Date: ${month} ${year}`, 10, 10);

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
        1: { cellWidth: 50 },
      },
      headStyles: {
        fontSize: 6,
      },
    });

    doc.save("Relevé.pdf");
    setPdfGenerated(true); 
    
  };

  return (
    <div>
      {pdfGenerated ? (
        <p>Relevé généré avec succès!</p>
      ) : (
        <p>Génération du PDF en cours...</p>
      )}
      <p>Mois: {selectedMonth} {selectedYear}</p>
    </div>
  );
}

export default PdfReleve;
