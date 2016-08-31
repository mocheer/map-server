import {AbstractMapProvider} from './AbstractMapProvider';
import {Coordinate} from '../core/Coordinate';
import {IMapProvider} from './IMapProvider';
/**
 * 天地图瓦片数据源提供程序
 */
export class TianDiProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: string;
	/**
	 * 天地图数据源构造函数
	 * @param	type		数据源类型，指定道路图、遥感图等
	 * @param	minZoom		数据源最小缩放级别
	 * @param	maxZoom		数据源最大缩放级别
	 */
	constructor() {
		super();
	}
	/**
	 * 返回特定投影坐标处的瓦片URL数组。
	 * @param	coord	投影坐标
	 * @return		坐标对应的瓦片数组。
	 */
	getTileUrls(coord: Coordinate): any[] {
		if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
			return null;
		}
		var sourceCoord: Coordinate = this.sourceCoordinate(coord);
		var server: number = coord.row%7;//随机镜像服务器编号
		var url: any = this.urlTemplate;
		var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom)
		return [result];
	}

	/**
	 * @return	天地图数据源字符串描述信息
	 */
	toString(): string {
		return "TianDiProvider_" + this.type;
	}
}

/**
 * 天地图-遥感（影像图）
 */
export class TianDiProvider_AERIAL extends TianDiProvider {
	type: string = "AERIAL";
	urlTemplate: string = "http://t{0}.tianditu.com/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={3}&TILEROW={2}&TILECOL={1}&FORMAT=tiles";
	constructor() {
		super();
	}
}

/**
 * 天地图-交通（矢量图）
 */
export class TianDiProvider_ROAD extends TianDiProvider {
	type: string = "ROAD";
	urlTemplate: string = "http://t{0}.tianditu.com/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={3}&TILEROW={2}&TILECOL={1}&FORMAT=tiles";
	constructor() {
		super();
	}
}

