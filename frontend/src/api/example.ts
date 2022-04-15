import { AuthApi } from "./api/apis/AuthApi";
import { ArticleControllerApi } from "./api/apis/ArticleControllerApi"
import { ArticleAddUpdate } from "./api/models/ArticleAddUpdate";

/**
 * An example of how to use authorized methods and how to pass parameters
 */
export function example() {
    const auth = new AuthApi();
    const articles = new ArticleControllerApi();
    auth.login()
        .then(result => {
            console.log(result);
            const article = { 'title': 'Article 11', 'introduction': 'Hello', 'content': '<html><html/>' } as ArticleAddUpdate;
            articles.addArticle({ 'articleAddUpdate': article }, { credentials: 'include' })
                .then(result => {
                    console.log('Add ' + result);
                    articles.getAllArticles()
                        .then(result => {
                            result.forEach(x => console.log(x));
                        })
                        .catch(error => console.error('Read' + error));
                })
                .catch(error => console.error('Add ' + error));
        })
        .catch(
            error => console.error('Login ' + error)
        );
}