//  import { exists, mapValues } from '../runtime';
import { ArticleFullInfoVM } from './ArticleFullInfoVM';
//  import {
//      AuthorVM,
//      AuthorVMFromJSON,
//      AuthorVMFromJSONTyped,
//      AuthorVMToJSON,
//  } from './AuthorVM';
//  import {
//      CommentVM,
//      CommentVMFromJSON,
//      CommentVMFromJSONTyped,
//      CommentVMToJSON,
//  } from './CommentVM';
 
 /**
  * 
  * @export
  * @interface ArticleFullInfoPlusContent
  */
 export interface ArticleFullInfoPlusContent extends ArticleFullInfoVM{
     content?: string;
 }
 
//  export function ArticleFullInfoVMFromJSON(json: any): ArticleFullInfoPlusContent {
//      return ArticleFullInfoVMFromJSONTyped(json, false);
//  }
 
//  export function ArticleFullInfoVMFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleFullInfoPlusContent {
//      if ((json === undefined) || (json === null)) {
//          return json;
//      }
//      return {
         
//          'id': !exists(json, 'id') ? undefined : json['id'],
//          'title': !exists(json, 'title') ? undefined : json['title'],
//          'introduction': !exists(json, 'introduction') ? undefined : json['introduction'],
//          'path': !exists(json, 'path') ? undefined : json['path'],
//          'publishDate': !exists(json, 'publishDate') ? undefined : (new Date(json['publishDate'])),
//          'author': !exists(json, 'author') ? undefined : AuthorVMFromJSON(json['author']),
//          'likes': !exists(json, 'likes') ? undefined : json['likes'],
//          'dislikes': !exists(json, 'dislikes') ? undefined : json['dislikes'],
//          'comments': !exists(json, 'comments') ? undefined : ((json['comments'] as Array<any>).map(CommentVMFromJSON)),
//      };
//  }
 
//  export function ArticleFullInfoVMToJSON(value?: ArticleFullInfoPlusContent | null): any {
//      if (value === undefined) {
//          return undefined;
//      }
//      if (value === null) {
//          return null;
//      }
//      return {
         
//          'id': value.id,
//          'title': value.title,
//          'introduction': value.introduction,
//          'path': value.path,
//          'publishDate': value.publishDate === undefined ? undefined : (value.publishDate.toISOString()),
//          'author': AuthorVMToJSON(value.author),
//          'likes': value.likes,
//          'dislikes': value.dislikes,
//          'comments': value.comments === undefined ? undefined : ((value.comments as Array<any>).map(CommentVMToJSON)),
//      };
//  }