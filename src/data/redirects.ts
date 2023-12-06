const redirectsData = [
    { source: "/cody", destination: "/code_search", permanent: false },
];

async function redirects() {
    return redirectsData;
}

module.exports = {
    redirects,
};
