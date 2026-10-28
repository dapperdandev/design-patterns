type Bread = 'white' | 'wheat' | 'rye';
type Cheese = 'cheddar' | 'swiss';


class Sandwich {
    bread: Bread = 'white';
    cheese: Cheese | null = null;
    decks = 1;
    toppings: string[] = [];
    toasted = false;
}

// -- Builder --------------------------------
interface SandwichBuilder {
    reset(): this;
    setBread(bread: Bread): this;
    addDeck(): this;
    setCheese(cheese: Cheese): this;
    addTopping(topping: string): this;
    toast(): this;
    build(): Sandwich;
}

// -- Concrete Builder ---------------------------------
class DeliSandwichBuilder implements SandwichBuilder {
    private _sandwich = new Sandwich();

    reset(): this {
        this._sandwich = new Sandwich();
        return this;
    }

    setBread(bread: Bread): this {
        this._sandwich.bread = bread;
        return this;
    }

    addDeck(): this {
        this._sandwich.decks += 1;
        return this;
    }

    setCheese(cheese: Cheese): this {
        this._sandwich.cheese = cheese;
        return this;
    }

    addTopping(topping: string): this {
        this._sandwich.toppings = [...this._sandwich.toppings, topping];
        return this;
    }

    toast(): this {
        this._sandwich.toasted = true;
        return this;
    }

    build(): Sandwich {
        const sandwich = this._sandwich;
        this.reset(); // after building, the next build should be a fresh default sandwich;

        return sandwich;
    }
}


// -- Director -----------------------------------------
class SandwichArtist {
    private _builder: SandwichBuilder;

    constructor(builder: SandwichBuilder) {
        this._builder = builder;
    }

    public makeGrilledCheese(): Sandwich {
        return this._builder
            .reset()
            .setBread('white')
            .setCheese('cheddar')
            .toast()
            .build();
    }

    public makeClubSandwich(): Sandwich {
        return this._builder
            .reset()
            .setBread('wheat')
            .addDeck()
            .setCheese('swiss')
            .addTopping('turkey')
            .addTopping('bacon')
            .toast()
            .build();
    }
}


// --- //
console.log(new Sandwich());

const builder = new DeliSandwichBuilder();
const custom = builder.setBread('rye').addDeck().addTopping('pastrami').build();
console.log(custom);


const artist = new SandwichArtist(builder);
console.log(artist.makeGrilledCheese());
console.log(artist.makeClubSandwich());
