/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100419
 Source Host           : localhost:3306
 Source Schema         : todo_list

 Target Server Type    : MySQL
 Target Server Version : 100419
 File Encoding         : 65001

 Date: 22/06/2023 18:18:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS `todos`;
CREATE TABLE `todos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `todo_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_done` tinyint(1) NULL DEFAULT 0,
  `is_done_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todos
-- ----------------------------
INSERT INTO `todos` VALUES (7, 'Do the Sidebar Feature', 0, NULL, '2023-06-22 10:07:03', '2023-06-22 10:07:03', NULL);
INSERT INTO `todos` VALUES (8, 'Do the Kitchen before dinner', 1, '2023-06-22T10:18:16.653Z', '2023-06-22 10:07:12', '2023-06-22 10:18:16', NULL);
INSERT INTO `todos` VALUES (9, 'Update computer', 0, NULL, '2023-06-22 10:07:38', '2023-06-22 10:07:38', NULL);
INSERT INTO `todos` VALUES (10, 'Buy new clothes', 1, '2023-06-22T10:07:48.014Z', '2023-06-22 10:07:45', '2023-06-22 10:07:48', NULL);
INSERT INTO `todos` VALUES (11, 'Do the kitchen', 0, NULL, '2023-06-22 10:08:03', '2023-06-22 10:08:06', '2023-06-22 10:08:06');
INSERT INTO `todos` VALUES (12, 'Do the dishes', 0, NULL, '2023-06-22 10:18:12', '2023-06-22 10:18:12', NULL);

SET FOREIGN_KEY_CHECKS = 1;
