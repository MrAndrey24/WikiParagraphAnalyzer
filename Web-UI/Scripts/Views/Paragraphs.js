class Paragraphs {
    LoadParagraphsTable() {
        const arrayColumns = [
            { data: "wordsStartingWithMyName" },
        ];

        $("#tblParagraphs").DataTable({
            ajax: {
                method: "GET",
                url: "https://acost-wiki-reader-lab1.azurewebsites.net/api/Text/GetAllText",
                contentType: "application/json;charset=utf-8",
                dataSrc: (json) => {
                    const paragraphData = {
                        wordsStartingWithMyName: json.wordsStartingWithMyName.join(", ")
                    };
                    return [paragraphData];
                },
            },
            columns: [
                { data: "wordsStartingWithMyName" }
            ],
        });

        this.LoandAverageWordsPerParagraph();

    };

    LoandAverageWordsPerParagraph() {
        $.ajax({
            url: "https://acost-wiki-reader-lab1.azurewebsites.net/api/Text/GetAllText",
            type: "GET",
            dataType: "json",
            success: function (result) {
                const averageWordsPerParagraph = result.averageWordsPerParagraph.toFixed(2);
                $("#txtpromedio").val(averageWordsPerParagraph);
            },
            error: function (xhr, status, error) {
                console.log("Error al obtener los datos");
            },
        });

        this.LoandParagraphWithMostWords();
    }

    LoandParagraphWithMostWords() {
        $.ajax({
            type: "GET",
            url: "https://acost-wiki-reader-lab1.azurewebsites.net/api/Text/GetAllText",
            contentType: "application/json;charset=utf-8",
            success: function (response) {
                const paragraphWithMostWords = response.paragraphWithMostWords.paragraphValue;
                $("#txtMas").val(paragraphWithMostWords);
            },
            error: function (xhr, status, error) {
                console.log("Error al obtener los datos");
            },
        });

        this.paragraphWithFewestWords();
    }

    paragraphWithFewestWords() {
        $.ajax({
            type: "GET",
            url: "https://acost-wiki-reader-lab1.azurewebsites.net/api/Text/GetAllText",
            contentType: "application/json;charset=utf-8",
            success: function (response) {
                const paragraphWithFewestWords = response.paragraphWithFewestWords.paragraphValue;
                $("#txtMenos").val(paragraphWithFewestWords);
            },
            error: function (xhr, status, error) {
                console.log("Error al obtener los datos");
            },
        });
    }
}

$(document).ready(() => {
    const view = new Paragraphs();
    view.LoadParagraphsTable();
});
