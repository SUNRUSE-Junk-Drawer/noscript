import File from "./../../build/database/file"
import List from "./../../build/database/list"
import IdentifierColumn from "./../../build/database/identifierColumn"
import StringColumn from "./../../build/database/stringColumn"
import UniqueConstraint from "./../../build/database/uniqueConstraint"
import ForeignKeyConstraint from "./../../build/database/foreignKeyConstraint"

export default game => {
  const localizations = new File(game, `localizations`)
  const localizationsId = new IdentifierColumn(localizations, `id`, true)
  new UniqueConstraint(localizationsId)
  new StringColumn(localizations, `name`, true, 1, 50)

  const companies = new File(game, `companies`)
  const companiesId = new IdentifierColumn(companies, `id`, true)
  new UniqueConstraint(companiesId)
  const companiesLocalizations = new List(companies, `localizations`)
  const companiesLocalizationsLocalizationId = new IdentifierColumn(companiesLocalizations, `localizationId`, true)
  new UniqueConstraint(companiesLocalizationsLocalizationId)
  new ForeignKeyConstraint(companiesLocalizationsLocalizationId, localizationsId)
  new ForeignKeyConstraint(localizationsId, companiesLocalizationsLocalizationId)
  new StringColumn(companiesLocalizations, `name`, true, 1, 50)
  new StringColumn(companiesLocalizations, `description`, true, 1, 250)

  const shipTypes = new File(game, `shipTypes`)
  const shipTypesId = new IdentifierColumn(shipTypes, `id`, true)
  new UniqueConstraint(shipTypesId)
  const shipTypesLocalizations = new List(shipTypes, `localizations`)
  const shipTypesLocalizationsLocalizationId = new IdentifierColumn(shipTypesLocalizations, `localizationId`, true)
  new UniqueConstraint(shipTypesLocalizationsLocalizationId)
  new ForeignKeyConstraint(shipTypesLocalizationsLocalizationId, localizationsId)
  new ForeignKeyConstraint(localizationsId, shipTypesLocalizationsLocalizationId)
  new StringColumn(shipTypesLocalizations, `name`, true, 1, 50)
  new StringColumn(shipTypesLocalizations, `description`, true, 1, 250)

  const shipClasses = new File(game, `shipClasses`)
  const shipClassesId = new IdentifierColumn(shipClasses, `id`, true)
  new UniqueConstraint(shipClassesId)
  const shipClassesShipTypeId = new IdentifierColumn(shipClasses, `shipTypeId`, true)
  new ForeignKeyConstraint(shipClassesShipTypeId, shipTypesId)
  const shipClassesLocalizations = new List(shipClasses, `localizations`)
  const shipClassesLocalizationsLocalizationId = new IdentifierColumn(shipClassesLocalizations, `localizationId`, true)
  new UniqueConstraint(shipClassesLocalizationsLocalizationId)
  new ForeignKeyConstraint(shipClassesLocalizationsLocalizationId, localizationsId)
  new ForeignKeyConstraint(localizationsId, shipClassesLocalizationsLocalizationId)
  new StringColumn(shipClassesLocalizations, `name`, true, 1, 50)
  new StringColumn(shipClassesLocalizations, `description`, true, 1, 250)

  const dealerships = new File(game, `dealerships`)
  const dealershipsId = new IdentifierColumn(dealerships, `id`, true)
  new UniqueConstraint(dealershipsId)
  const dealershipsLocalizations = new List(dealerships, `localizations`)
  const dealershipsLocalizationsLocalizationId = new IdentifierColumn(dealershipsLocalizations, `localizationId`, true)
  new UniqueConstraint(dealershipsLocalizationsLocalizationId)
  new ForeignKeyConstraint(dealershipsLocalizationsLocalizationId, localizationsId)
  new ForeignKeyConstraint(localizationsId, dealershipsLocalizationsLocalizationId)
  new StringColumn(dealershipsLocalizations, `name`, true, 1, 50)
  new StringColumn(dealershipsLocalizations, `description`, true, 1, 250)

  const shipInstances = new File(game, `shipInstances`)
  const shipInstancesId = new IdentifierColumn(shipInstances, `id`, true)
  new UniqueConstraint(shipInstancesId)
  const shipInstancesShipClassId = new IdentifierColumn(shipInstances, `shipClassId`, true)
  new ForeignKeyConstraint(shipInstancesShipClassId, shipClassesId)
  const shipInstancesDealershipId = new IdentifierColumn(shipInstances, `dealershipId`, false)
  new ForeignKeyConstraint(shipInstancesDealershipId, dealershipsId)
}
