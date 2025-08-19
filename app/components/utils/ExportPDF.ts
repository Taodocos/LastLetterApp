import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleExportPDF = async () => {
  try {
    const input = document.getElementById("letter-content");
    if (!input) throw new Error("Letter content element not found");

    // Clone the element and prepare it offscreen
    const clone = input.cloneNode(true) as HTMLElement;
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.width = "800px"; // force width for better rendering if needed
    document.body.appendChild(clone);

    // Normalize unsupported colors (like oklch)
    clone.querySelectorAll<HTMLElement>("*").forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
      }
      if (computedStyle.color.includes("oklch")) {
        el.style.color = "#000000";
      }
      if (computedStyle.borderColor.includes("oklch")) {
        el.style.borderColor = "#cccccc";
      }
    });

    // Generate canvas
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    // Clean up
    document.body.removeChild(clone);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let position = 0;

    if (imgHeight > pageHeight) {
      while (position < imgHeight) {
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          -position,
          imgWidth,
          imgHeight
        );
        position += pageHeight;
        if (position < imgHeight) {
          pdf.addPage();
        }
      }
    } else {
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
    }

    const filename = `Letter_${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};
