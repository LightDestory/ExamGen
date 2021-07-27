import {pingRoute} from "./pingRoute";
import {questionRoute} from "./questionRoute";
import {examRoute} from "./examRoute";
import {subjectRoute} from "./subjectRoute";
import {categoryRoute} from "./categoryRoute";
import {Application} from "express";

export function registerRoutes(app: Application) {
    app.use('/api/ping', pingRoute);
    app.use('/api/subject', subjectRoute);
    app.use('/api/subject/:subjectName/category', categoryRoute);
    app.use('/api/question', questionRoute);
    app.use('/api/exam', examRoute)
}
