import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import RequireAuth from '../layout/RequireAuth';

/**
 * 路由说明（面向小白开发者）
 * - 这个文件只负责把 URL 映射到页面组件（Route），不包含页面内部实现。
 * - 页面组件都使用了懒加载（React.lazy），即只有当用户访问对应路由时才会加载那一部分代码，
 *   有利于减小首屏体积。
 * - 如果你想修改某个页面的具体内容，请在 `src/pages/` 目录下找到对应的文件（例如 HomePage.tsx）。
 */

// 以下为懒加载的页面组件说明（注释写给没有前端经验的开发者）
// HomePage: 应用首页，包含 Part1/Part2/Part3 的入口卡片、统计信息和快速操作按钮。
const HomePage = lazy(() => import('../pages/HomePage'));
// Part2Categories: Part2 的分类页，展示“人物/地点/事件”三类，点击进入对应分类的题目列表。
const Part2Categories = lazy(() => import('../pages/Part2Categories'));
// Part2TopicList: 某一分类下的题目列表页面，列出所有话题分组与题目，带有音效交互。
const Part2TopicList = lazy(() => import('../pages/Part2TopicList'));
// Part2StoryDetail: 单个 Part2 话题的详情页，包含高分回答、朗读、录音、上传与关键词高亮等练习工具。
const Part2StoryDetail = lazy(() => import('../pages/Part2StoryDetail'));
// Part3Home: Part3 的入口页，列出 Part3 的子模块（问题类型、主题、分类）。
const Part3Home = lazy(() => import('../pages/Part3Home'));
// Part3QuestionTypes: Part3 的问题类型说明页（示例/占位页）。
const Part3QuestionTypes = lazy(() => import('../pages/Part3QuestionTypes'));
// Part3Themes: Part3 的主题集合页（示例/占位页）。
const Part3Themes = lazy(() => import('../pages/Part3Themes'));
// Part3Classifications: Part3 的题目分类展示页（示例/占位页）。
const Part3Classifications = lazy(() => import('../pages/Part3Classifications'));
// TopicList / TopicDetail: 通用的 Topics 列表与详情页（用于 Part1/3 等通用路由）。
const TopicList = lazy(() => import('../pages/TopicList'));
const TopicDetail = lazy(() => import('../pages/TopicDetail'));
// MockExam: 全真模考试题页（此页面被 RequireAuth 包裹，需要登录才能进入）。
const MockExam = lazy(() => import('../pages/MockExam'));
// StreakPage: 签到/练习记录页（需要登录）。
const StreakPage = lazy(() => import('../pages/StreakPage'));
// Login / Register: 登录与注册页面，登录后会保存到本地（示例实现，非后端鉴权）。
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
// NotFound: 404 页面，当访问不存在的路由时显示，引导用户返回首页。
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/part/2" element={<Part2Categories />} />
        <Route path="/part/2/:category" element={<Part2TopicList />} />
        <Route path="/part/2/:category/topic/:topicId" element={<Part2StoryDetail />} />
        <Route path="/part/3" element={<Part3Home />} />
        <Route path="/part/3/question-types" element={<Part3QuestionTypes />} />
        <Route path="/part/3/themes" element={<Part3Themes />} />
        <Route path="/part/3/classifications" element={<Part3Classifications />} />
        <Route path="/part/:partNumber" element={<TopicList />} />
        <Route path="/part/:partNumber/topic/:topicId" element={<TopicDetail />} />

        <Route element={<RequireAuth />}>
          <Route path="/mock-exam" element={<MockExam />} />
          <Route path="/streak" element={<StreakPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
