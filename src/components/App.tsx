import * as React from "react";
import { Grid as KendoGrid, GridColumn, GridCell } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { hot } from "react-hot-loader";

const products = [{
    ProductID : 1,
    ProductName : "Chai",
    SupplierID : 1,
    CategoryID : 1,
    QuantityPerUnit : "10 boxes x 20 bags",
    UnitPrice : 18.0000,
    UnitsInStock : 39,
    UnitsOnOrder : 0,
    ReorderLevel : 10,
    Discontinued : false,
    Category : {
        CategoryID : 1,
        CategoryName : "Beverages",
        Description : "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    ProductID : 2,
    ProductName : "Chang",
    SupplierID : 1,
    CategoryID : 1,
    QuantityPerUnit : "24 - 12 oz bottles",
    UnitPrice : 19.0000,
    UnitsInStock : 17,
    UnitsOnOrder : 40,
    ReorderLevel : 25,
    Discontinued : false,
    Category : {
        CategoryID : 1,
        CategoryName : "Beverages",
        Description : "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    ProductID : 3,
    ProductName : "Aniseed Syrup",
    SupplierID : 1,
    CategoryID : 2,
    QuantityPerUnit : "12 - 550 ml bottles",
    UnitPrice : 10.0000,
    UnitsInStock : 13,
    UnitsOnOrder : 70,
    ReorderLevel : 25,
    Discontinued : false,
    Category : {
        CategoryID : 2,
        CategoryName : "Condiments",
        Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}, {
    ProductID : 4,
    ProductName : "Chef Anton\"s Cajun Seasoning",
    SupplierID : 2,
    CategoryID : 2,
    QuantityPerUnit : "48 - 6 oz jars",
    UnitPrice : 22.0000,
    UnitsInStock : 53,
    UnitsOnOrder : 0,
    ReorderLevel : 0,
    Discontinued : false,
    Category : {
        CategoryID : 2,
        CategoryName : "Condiments",
        Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}, {
    ProductID : 5,
    ProductName : "Chef Anton\"s Gumbo Mix",
    SupplierID : 2,
    CategoryID : 2,
    QuantityPerUnit : "36 boxes",
    UnitPrice : 21.3500,
    UnitsInStock : 0,
    UnitsOnOrder : 0,
    ReorderLevel : 0,
    Discontinued : true,
    Category : {
        CategoryID : 2,
        CategoryName : "Condiments",
        Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}, {
    ProductID : 6,
    ProductName : "Grandma\"s Boysenberry Spread",
    SupplierID : 3,
    CategoryID : 2,
    QuantityPerUnit : "12 - 8 oz jars",
    UnitPrice : 25.0000,
    UnitsInStock : 120,
    UnitsOnOrder : 0,
    ReorderLevel : 25,
    Discontinued : false,
    Category : {
        CategoryID : 2,
        CategoryName : "Condiments",
        Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}, {
    ProductID : 7,
    ProductName : "Uncle Bob\"s Organic Dried Pears",
    SupplierID : 3,
    CategoryID : 7,
    QuantityPerUnit : "12 - 1 lb pkgs.",
    UnitPrice : 30.0000,
    UnitsInStock : 15,
    UnitsOnOrder : 0,
    ReorderLevel : 10,
    Discontinued : false,
    Category : {
        CategoryID : 7,
        CategoryName : "Produce",
        Description : "Dried fruit and bean curd"
    }
}, {
    ProductID : 8,
    ProductName : "Northwoods Cranberry Sauce",
    SupplierID : 3,
    CategoryID : 2,
    QuantityPerUnit : "12 - 12 oz jars",
    UnitPrice : 40.0000,
    UnitsInStock : 6,
    UnitsOnOrder : 0,
    ReorderLevel : 0,
    Discontinued : false,
    Category : {
        CategoryID : 2,
        CategoryName : "Condiments",
        Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}, {
    ProductID : 9,
    ProductName : "Mishi Kobe Niku",
    SupplierID : 4,
    CategoryID : 6,
    QuantityPerUnit : "18 - 500 g pkgs.",
    UnitPrice : 97.0000,
    UnitsInStock : 29,
    UnitsOnOrder : 0,
    ReorderLevel : 0,
    Discontinued : true,
    Category : {
        CategoryID : 6,
        CategoryName : "Meat/Poultry",
        Description : "Prepared meats"
    }
}, {
    ProductID : 10,
    ProductName : "Ikura",
    SupplierID : 4,
    CategoryID : 8,
    QuantityPerUnit : "12 - 200 ml jars",
    UnitPrice : 31.0000,
    UnitsInStock : 31,
    UnitsOnOrder : 0,
    ReorderLevel : 0,
    Discontinued : false,
    Category : {
        CategoryID : 8,
        CategoryName : "Seafood",
        Description : "Seaweed and fish"
    }
}];

class CustomCell extends GridCell {
    render() {
        return (
            <td>
                <input disabled type="checkbox" checked={this.props.dataItem[this.props.field]} />
            </td>
        );
    }
}

class GridExample extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const initialFilter = {
            logic: "and",
            filters: [{ field: "ProductName", operator: "contains", value: "Chef" }]
        };
        this.state = {
            data: this.getProducts(initialFilter),
            filter: initialFilter
        };
        this.filterChange = this.filterChange.bind(this);
    }

    filterChange(event: any) {
        this.setState({
            data: this.getProducts(event.filter),
            filter: event.filter
        });
    }

    getProducts(filter: any) {
        const data = products.slice();
        return filterBy(data, filter);
    }

    render() {
        return (
            <div style={{ maxWidth: "50%" }}>
                <KendoGrid
                    data={this.state.data}
                    filterable={true}
                    filter={this.state.filter}
                    onFilterChange={this.filterChange}
                    reorderable={true}
                    resizable
                >
                    <GridColumn field="ProductID" title="ID" filterable={false} width="40px" />
                    <GridColumn field="ProductName" title="Product Name" />
                    <GridColumn field="UnitsOnOrder" title="First Ordered On" width="240px" filter="date" format="{0:d}" />
                    <GridColumn field="UnitPrice" title="Unit Price" width="180px" filter="numeric" format="{0:c}" />
                    <GridColumn field="Discontinued" title="Discontinued" width="130px" filter="boolean" cell={CustomCell} />
                </KendoGrid>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <React.StrictMode>
                <GridExample />
            </React.StrictMode>
        );
    }
}

const HotApp = hot(module)(App);

export default HotApp;