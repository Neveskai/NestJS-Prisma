import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class FieldsPipe implements PipeTransform {
  private validFields: string[]

  constructor(validFields: string[]) {
    this.validFields = validFields
  }

  transform(fields: string[]): any {
    if (!fields.length || fields.length > this.validFields.length) {
      throw new BadRequestException(`Select fields inside valid fields: ${this.validFields}`)
    }

    fields.forEach((field) => {
      if (!this.validFields.includes(field))
        throw new BadRequestException(`Invalid field: ${field}`)
    })

    const parsedFields = fields.reduce((acc: any, field: string) => {
      acc[field] = true
      return acc
    }, {})

    return parsedFields
  }
}
