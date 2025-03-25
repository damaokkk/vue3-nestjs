import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getData(params): string {
    if (!params.id || !Number.isInteger(params.id)) {
      throw new HttpException(
        '必须包含id参数，并且id为数字',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'get data ' + params.id;
  }

  getAllData(): string {
    return 'get all data';
  }

  addData(body, query): string {
    return 'add data: ' + JSON.stringify(body) + ', id=' + query.id;
  }

  updateData(body): string {
    return 'update data: ' + JSON.stringify(body);
  }

  deleteData(params): string {
    return 'delete data:' + params.id;
  }
}
