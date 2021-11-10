function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    // load the component to be customized
    const ProductFullDetailComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    // import the custom component in the component to be modified
    const ProductShortDescription = ProductFullDetailComponent.addImport(
        "ProductShortDescription from '@theme/components/ProductShortDescription'"
    );
    // insert the custom component that renders product's short description
    ProductFullDetailComponent.insertAfterJSX(
        '<section className={classes.title}>',
        `<${ProductShortDescription} url_key={product.url_key} />`
    );
}
module.exports = localIntercept;
