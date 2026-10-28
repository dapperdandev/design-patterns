/**
 * THE FACTORY METHOD PATTERN - coffee-stand edition
 * Follow the steps in the left panel. Run checks: Ctrl+Alt+Enter.
 */

// -- STEP 1 - PRODUCT ------------------------------------------
interface Coffee {
    name: string;
    ounces: number;
    caffeineMg: number;
}

// -- STEP 2 - CONCRETE PRODUCTS --------------------------------
class Espresso implements Coffee {
    name: string = 'espresso';
    ounces: number = 1;
    caffeineMg: number = 64;
}

class ColdBrew implements Coffee {
    name: string = 'cold brew';
    ounces: number = 12;
    caffeineMg: number = 200;
}

console.log(new Espresso());
console.log(new ColdBrew());

// -- STEP 3 - CREATOR ------------------------------------------
abstract class CoffeeStand {
    cupsServed = 0;

    abstract brew(): Coffee;

    serve(): Coffee {
        const cup = this.brew();
        this.cupsServed++;
        return cup;
    }
}

// -- STEP 4 - CONCRETE CREATORS --------------------------------
class EspressoBar extends CoffeeStand {
    brew(): Coffee {
        return new Espresso();
    }
}

class ColdBrewCart extends CoffeeStand {
    brew(): Coffee {
        return new ColdBrew();
    }
}

const bar = new EspressoBar();
const cart = new ColdBrewCart();

console.log(bar.serve());
console.log(cart.serve());
console.log(bar.cupsServed, cart.cupsServed);
