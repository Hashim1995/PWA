/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);

    const magentoPath = 'node_modules/@magento';

    const globby = require('globby');
    const fs = require('fs');
    const path = require('path');

    (async () => {
        /** Load all CSS files from src/components */
        const paths = await globby('src/components', {
            expandDirectories: {
                extensions: ['css']
            }
        });

        paths.forEach(myPath => {
            const relativePath = myPath.replace(
                'src/components',
                `${magentoPath}/venia-ui/lib/components`
            );
            const absolutePath = path.resolve(relativePath);

            /** Identify if local component maps to venia-ui component */
            fs.stat(absolutePath, (err, stat) => {
                if (!err && stat && stat.isFile()) {
                    /**
                     * This means we have matched a local file to something in venia-ui!
                     * Find the JS  component from our CSS file name
                     * */
                    const jsComponent = relativePath
                        .replace('node_modules/', '')
                        .replace('.css', '.js');
                }
            });
        });
    })();
}

module.exports = localIntercept;
