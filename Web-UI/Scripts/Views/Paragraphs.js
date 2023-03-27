class Paragraphs {
    constructor() {
        this.paragraphData = null;
    }

    LoadParagraphsTable() {
        const arrayColumns = [
            { data: "wordsStartingWithMyName" },
        ];

        $("#tblParagraphs").DataTable({
            data: [this.paragraphData],
            columns: [
                { data: "wordsStartingWithMyName" }
            ],
        });

        this.LoadAverageWordsPerParagraph();
        this.LoadParagraphWithMostWords();
        this.LoadParagraphWithFewestWords();
    };

    LoadDataFromAPI() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "https://acost-wiki-reader-lab1.azurewebsites.net/api/Text/GetAllText",
                contentType: "application/json;charset=utf-8",
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    reject("Error al obtener los datos");
                },
            });
        });
    }

    async LoadParagraphData() {
        try {
            this.paragraphData = await this.LoadDataFromAPI();
            this.LoadParagraphsTable();
        } catch (error) {
            console.log(error);
        }
    }

    LoadAverageWordsPerParagraph() {
        const averageWordsPerParagraph = this.paragraphData.averageWordsPerParagraph.toFixed(2);
        $("#txtpromedio").val(averageWordsPerParagraph);
    }

    LoadParagraphWithMostWords() {
        const paragraphWithMostWords = this.paragraphData.paragraphWithMostWords.paragraphValue;
        $("#txtMas").val(paragraphWithMostWords);
    }

    LoadParagraphWithFewestWords() {
        const paragraphWithFewestWords = this.paragraphData.paragraphWithFewestWords.paragraphValue;
        $("#txtMenos").val(paragraphWithFewestWords);
    }
}

$(document).ready(() => {
    const view = new Paragraphs();
    view.LoadParagraphData();
});
