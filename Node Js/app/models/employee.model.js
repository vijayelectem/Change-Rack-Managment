module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    employeeName: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    salary: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING
    }
  });

  return Employee;
};
