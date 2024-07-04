export default class Person {
    constructor ({ id, vehicles, kmTraveled, name, email, from, to }) {
        this.id = id;
        this.vehicles = vehicles;
        this.kmTraveled = kmTraveled;
        this.from = from;
        this.to = to;
        this.name = name;
        this.email = email;
    }

    formatted(language) {

        const mapDate = (data) => {
            const [year, month, day] = data.split('-').map(Number)
            return new Date(year, (month - 1), day)
        }

        return {
            id: Number(this.id),
            name: this.name,
            email: this.email,
            vehicles: new Intl.ListFormat(
                language, { style: "long", type: "conjunction" })
                .format(this.vehicles),
            kmTraveled: new Intl.NumberFormat(
                language, { style: "unit", unit: "kilometer" })
                .format(this.kmTraveled),
            from: new Intl.DateTimeFormat(
                language,
                {
                    month: "long",
                    day: "2-digit",
                    year: "numeric"
                })
                .format(mapDate(this.from)),
            to: new Intl
                .DateTimeFormat(
                    language,
                    {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'

                    }
                )
                .format(mapDate(this.to))

            
        }
    }
}