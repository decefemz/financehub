import createArticleSource from './services/createArticleSource';
import createUserAccount from './services/createUserAccount';
import createUserProfile from './services/createUserProfile';
import createSession from './services/createSession';
import getSession from './services/getSession';
import getUserProfile from './services/getUserProfile';
import getArticleSource from './services/getArticleSource';
import { createLinkedArticles } from './services/createLinkedArticle';

import dotenv from 'dotenv';
dotenv.config();

class Services {
  public static createUserAccount = createUserAccount;
  public static createUserProfile = createUserProfile;
  public static createSession = createSession;
  public static getSession = getSession;
  public static getUserProfile = getUserProfile;
  public static createArticleSource = createArticleSource;
  public static getArticleSource = getArticleSource;
  public static createLinkedArticles = createLinkedArticles;
}

export default Services;
