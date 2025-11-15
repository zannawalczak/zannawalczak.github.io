<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Table Overlay</title>
    <style>
        .container {
            position: relative;
            width: 868px;
            height: 614px;
            background: url('faktura.png') no-repeat;
            background-size: contain;
        }
        .Rectangle_12 {
            
            position: absolute;
            left: 769px;
            top: 55px;
            width: 43px;
            height: 16px;
            z-index: 20;
            letter-spacing: 10px;
        }
        .Rectangle_13 {
            
            position: absolute;
            left: 696px;
            top: 55px;
            width: 43px;
            height: 16px;
            z-index: 19;
            letter-spacing: 10px;
        }
        
        .Rectangle_14 {
            
            position: absolute;
            left: 648px;
            top: 55px;
            width: 43px;
            height: 16px;
            z-index: 18;
            letter-spacing: 10px;
        }

        .Rectangle_1 {
            
            position: absolute;
            left: 83px;
            top: 63px;
            width: 246px;
            height: 19px;
            z-index: 17;
        }

        .Rectangle_2 {
            
            position: absolute;
            left: 83px;
            top: 90px;
            width: 246px;
            height: 19px;
            z-index: 16;
        }

        .Rectangle_3 {
            
            position: absolute;
            left: 83px;
            top: 36px;
            width: 246px;
            height: 19px;
            z-index: 15;
        }

        .Rectangle_4 {
            
            position: absolute;
            left: 341px;
            top: 54px;
            width: 303px;
            height: 23px;
            z-index: 14;
        }

        .Rectangle_5 {
            
            position: absolute;
            left: 95px;
            top: 240px;
            width: 387px;
            height: 17px;
            z-index: 13;
        }

        .Rectangle_7 {
            
            position: absolute;
            left: 717px;
            top: 239px;
            width: 108px;
            height: 18px;
            z-index: 11;
        }

        .Rectangle_8 {
            
            position: absolute;
            left: 619px;
            top: 239px;
            width: 88px;
            height: 18px;
            z-index: 10;
        }

        .Rectangle_9 {
            
            position: absolute;
            left: 560px;
            top: 239px;
            width: 53px;
            height: 18px;
            z-index: 9;
        }
        .Rectangle_10 {
            
            position: absolute;
            left: 490px;
            top: 239px;
            width: 53px;
            height: 18px;
            z-index: 8;
        }
        
        .Rectangle_11 {
            
            position: absolute;
            left: 66px;
            top: 239px;
            width: 12px;
            height: 18px;
            z-index: 7;
        }

        .Rectangle_15 {
            
            position: absolute;
            left: 213px;
            top: 137px;
            width: 608px;
            height: 15px;
            z-index: 4;
        }

        .Rectangle_16 {
            
            position: absolute;
            left: 508px;
            top: 83px;
            width: 145px;
            height: 27px;
            z-index: 3;
            font-size: 26px;
            color: #f11c82;
            text-align: left;
            font-weight: bold;
            padding-left: 10px;
        }
        
        .Rectangle_17 {
            
            position: absolute;
            left: 713px;
            top: 330px;
            width: 112px;
            height: 25px;
            z-index: 2;
        }
        .Rectangle_18 {
            
            position: absolute;
            left: 213px;
            top: 163px;
            width: 608px;
            height: 15px;
            z-index: 5;
        }   



        body{
            text-align: right;
            font-family: Calibri;
        }
        .rowcontainer{
            position: absolute;
            left: 63px;
            top: 239px;
            width: 763px;
            height: 90px;
            display: flex;
            flex-direction: column;
        }
        .row{
            width: 100%;
            height: 25%;
            display: flex;
        }
        .lp{
            width: 2%;
        }
        .nazwa{
            width: 53%;
        }
        .miara{
            width: 8%;
        }
        .ilosc{
            width: 10%;
        }
        .cena{
            width: 12%;
            letter-spacing: 4px;
        }
        .wartosc{
            width: 15%;
            letter-spacing: 4px;
        }
        .Rectangle_17{
            letter-spacing: 4px;
        }
        a{
            position: absolute;
            top: 550px;
            left: 80px;
        }
        
    </style>
    <script>
        function calculateTotals() {
            let rows = document.querySelectorAll(".row");
            let totalValue = 0;

            rows.forEach(row => {
                let ilosc = parseFloat(row.querySelector(".ilosc").textContent) || 0;
                let cena = parseFloat(row.querySelector(".cena").textContent) || 0;
                let wartosc = ilosc * cena;

                row.querySelector(".wartosc").textContent = wartosc.toFixed(2);

                totalValue += wartosc;
            });

            document.getElementsByClassName("Rectangle_17")[0].textContent = totalValue.toFixed(2);
        }
        window.onload = calculateTotals;
    </script>
</head>
<body>
    <div class="container">
        <div class="Rectangle_1">
            <xsl:value-of select="invoice/seller/street"/>
        </div>
        <div class="Rectangle_2">
        <xsl:value-of select="invoice/seller/zip"/>&#160;<xsl:value-of select="invoice/seller/city"/>
        </div>
        <div class="Rectangle_3">
            <xsl:value-of select="invoice/seller/name"/>
        </div>
        <div class="Rectangle_4">
            <xsl:value-of select="invoice/seller/city"/>
        </div>
        <div class="Rectangle_6"></div>
        <div class="Rectangle_12">
            <xsl:value-of select="invoice/header/year"/>
        </div>
        <div class="Rectangle_13">
            <xsl:value-of select="invoice/header/month"/>
        </div>
        <div class="Rectangle_14">
            <xsl:value-of select="invoice/header/day"/>
        </div>
        <div class="Rectangle_15">
            <xsl:value-of select="invoice/buyer/name"/>
        </div>
        <div class="Rectangle_16">
            <xsl:value-of select="invoice/header/invoiceNumber"/>
        </div>
        <div class="Rectangle_17"></div>
        <div class="Rectangle_18">
            <xsl:value-of select="invoice/buyer/street"/>,&#160;<xsl:value-of select="invoice/buyer/zip"/>&#160;<xsl:value-of select="invoice/buyer/city"/>
        </div>

        <div class="rowcontainer">
            <xsl:for-each select="invoice/items/item">
                <div class="row">
                    <div class="lp"><xsl:value-of select="position()"/></div>
                    <div class="nazwa"><xsl:value-of select="name"/></div>
                    <div class="miara"><xsl:value-of select="unit"/></div>
                    <div class="ilosc"><xsl:value-of select="quantity"/></div>
                    <div class="cena"><xsl:value-of select="price"/></div>
                    <div class="wartosc"></div>
                </div>
            </xsl:for-each>
        </div>
        <a href="fakturakod.txt">kod</a>
    </div>
    
</body>
</html>
    </xsl:template>
</xsl:stylesheet>