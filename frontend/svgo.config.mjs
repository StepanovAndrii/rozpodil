// --config svgo.config.mjs 

export default {
    multipass: true,
    datauri: 'unenc',
    js2svg: {
        indent: 4,
        pretty: false,
    },
    plugins: [
        'preset-default',
        'prefixIds',
        {
            name: 'prefixIds',
            params: {
                prefix: 'optimised',
            },
        },
    ],
};