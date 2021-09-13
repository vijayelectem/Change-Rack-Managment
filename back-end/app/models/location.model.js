module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define('location', {
        locationName: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING,
        },
        pincode: {
            type: Sequelize.STRING,
        }
    });

    return Location;
}