const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const DimensionTranslation = sequelize.define('DimensionTranslation', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        dimensionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        languageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        translation: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
    }, {
        tableName: 'DimensionTranslation',
        classMethods: {
            associate (models) {
                const Dimension = models['Dimension'];
                Dimension.hasMany(DimensionTranslation, { foreignKey: 'dimensionId' });

                DimensionTranslation.belongsTo(Dimension,
                    {
                        foreignKey: {
                            name: 'dimensionId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });
            },
        },
    });

    DimensionTranslation.addHook('beforeCreate', async dimensionTranslation => {
        if (dimensionTranslation.id === null) {
            dimensionTranslation.id = uuid();
        }
    });

    return DimensionTranslation;
};
