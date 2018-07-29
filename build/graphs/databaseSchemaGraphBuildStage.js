import WriteFileBuildStage from "./../writeFileBuildStage"
import UniqueConstraint from "./../database/uniqueConstraint"
import ForeignKeyConstraint from "./../database/foreignKeyConstraint"

export default class DatabaseSchemaGraphBuildStage extends WriteFileBuildStage {
  constructor(game, createGraphsDistDirectory) {
    super(
      game,
      `graphs/databaseSchemaGraph`,
      () => [`games`, game.name, `dist`, `graphs`, `databaseSchema.nomnoml`],
      () => {
        let output = ``

        const findFullPathTo = column => {
          let fullPath = `${column.name}`
          const recurseUp = thing => {
            if (thing) {
              fullPath = `${thing.name}.${fullPath}`
              recurseUp(thing.parent)
            }
          }
          recurseUp(column.parent)
          return fullPath
        }

        game.files.forEach(file => {
          output += `[<note>${file.name}]\n`

          const recurseList = (list, path) => {
            output += `[${path}] -> [<database>${path}.${list.name}]\n`
            list.lists.forEach(childList => recurseList(childList, `${path}.${list.name}`))
            list.columns.forEach(column => recurseColumn(column, `${path}.${list.name}`))
          }

          const recurseColumn = (column, path) => {
            if (column.constraints.some(constraint => constraint instanceof UniqueConstraint)) {
              output += `[<reference>${path}.${column.name}]\n`
            }

            output += `[${path}] -> [${path}.${column.name}]\n`
          }

          file.lists.forEach(list => recurseList(list, file.name))
          file.columns.forEach(column => recurseColumn(column, file.name))
        })

        const visitedColumns = []

        game.files.forEach(file => {
          const recurseList = (list, path) => {
            list.lists.forEach(childList => recurseList(childList, `${path}.${list.name}`))
            list.columns.forEach(column => recurseColumn(column, `${path}.${list.name}`))
          }

          const recurseColumn = (column, path) => {
            column.constraints
              .filter(constraint => constraint instanceof ForeignKeyConstraint)
              .forEach(constraint => {
                if (constraint.toColumn.constraints
                  .filter(toConstraint => toConstraint instanceof ForeignKeyConstraint)
                  .some(toConstraint => toConstraint.toColumn == column)
                ) {
                  if (visitedColumns.includes(constraint.toColumn)) {
                    output += `[${path}.${column.name}] <--> [${findFullPathTo(constraint.toColumn)}]\n`
                  }
                } else {
                  output += `[${path}.${column.name}] --> [${findFullPathTo(constraint.toColumn)}]\n`
                }
              })

            visitedColumns.push(column)
          }

          file.lists.forEach(list => recurseList(list, file.name))
          file.columns.forEach(column => recurseColumn(column, file.name))
        })

        return output
      },
      [createGraphsDistDirectory]
    )
  }
}
