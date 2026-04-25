class APIHelper 
{
    constructor(query, queryStr) {
        this.query = query;       // Mongoose Query
        this.queryStr = queryStr; // Query String from URL
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i", // ✅ case insensitive (Rice = rice = RICE)
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {}
    pagination() {}
}

export default APIHelper;