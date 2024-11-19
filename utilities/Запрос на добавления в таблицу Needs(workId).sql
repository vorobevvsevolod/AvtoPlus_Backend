-- ЩПС
WITH inserted_material_22 AS (
    INSERT INTO public.needs(
        id, name, description, "createdAt", "updatedAt", "workId", "parentCategoryId", "materialId")
    VALUES 
    (
        DEFAULT, 
        'Зачем нужен ЩПС?', 
        'Щебеночно-песчаная смесь (ЩПС) используется для укрепления дорожных покрытий, оснований фундаментов и строительных площадок.', 
        NOW(), 
        NOW(), 
        NULL, 
        NULL, 
        22
    ) RETURNING "id"
),
-- ЩПС с4
inserted_material_23 AS (
    INSERT INTO public.needs(
        id, name, description, "createdAt", "updatedAt", "workId", "parentCategoryId", "materialId")
    VALUES 
    (
        DEFAULT, 
        'Зачем нужен ЩПС С4?', 
        'ЩПС С4 применяется для создания прочных оснований под дороги и улучшения их долговечности.', 
        NOW(), 
        NOW(), 
        NULL, 
        NULL, 
        23
    ) RETURNING "id"
),
-- ЩПС с5
inserted_material_24 AS (
    INSERT INTO public.needs(
        id, name, description, "createdAt", "updatedAt", "workId", "parentCategoryId", "materialId")
    VALUES 
    (
        DEFAULT, 
        'Зачем нужен ЩПС С5?', 
        'ЩПС С5 используется для укладки дорожных оснований с высокой нагрузкой и стабилизации грунта.', 
        NOW(), 
        NOW(), 
        NULL, 
        NULL, 
        24
    ) RETURNING "id"
),
-- ЩПС с6
inserted_material_25 AS (
    INSERT INTO public.needs(
        id, name, description, "createdAt", "updatedAt", "workId", "parentCategoryId", "materialId")
    VALUES 
    (
        DEFAULT, 
        'Зачем нужен ЩПС С6?', 
        'ЩПС С6 применяется для строительства подъездных путей, укрепления обочин и дренажных систем.', 
        NOW(), 
        NOW(), 
        NULL, 
        NULL, 
        25
    ) RETURNING "id"
)
-- Добавляем факторы
INSERT INTO public.needs(
    id, name, description, "createdAt", "updatedAt", "workId", "parentCategoryId", "materialId")
VALUES 
-- ЩПС
(
    DEFAULT, 
    'Укрепление дорожных оснований', 
    'ЩПС применяется для создания прочного и стабильного основания под дорожные покрытия.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_22), 
    22
),
(
    DEFAULT, 
    'Создание подъездных путей', 
    'Используется для обустройства временных и постоянных дорог.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_22), 
    22
),
(
    DEFAULT, 
    'Снижение деформации грунта', 
    'ЩПС эффективно предотвращает просадки и растрескивания оснований.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_22), 
    22
),
-- ЩПС С4
(
    DEFAULT, 
    'Основания под асфальт', 
    'ЩПС С4 обеспечивает надежное основание для укладки асфальтового покрытия.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_23), 
    23
),
(
    DEFAULT, 
    'Снижение износа покрытия', 
    'Помогает увеличить срок службы дорог, снижая вероятность растрескивания.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_23), 
    23
),
(
    DEFAULT, 
    'Улучшение дренажных характеристик', 
    'ЩПС С4 способствует отводу воды, предотвращая затопления.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_23), 
    23
),
-- ЩПС С5
(
    DEFAULT, 
    'Основание для высоких нагрузок', 
    'ЩПС С5 выдерживает большие транспортные нагрузки, не теряя прочности.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_24), 
    24
),
(
    DEFAULT, 
    'Стабилизация грунта', 
    'Используется для предотвращения подвижек и просадок в сложных условиях.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_24), 
    24
),
(
    DEFAULT, 
    'Создание слоев под щебеночные покрытия', 
    'Служит основой для надежного распределения нагрузки.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_24), 
    24
),
-- ЩПС С6
(
    DEFAULT, 
    'Укрепление обочин', 
    'ЩПС С6 используется для предотвращения разрушений краев дорожного покрытия.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_25), 
    25
),
(
    DEFAULT, 
    'Создание подъездных путей', 
    'Применяется для временных дорог и участков с низкой транспортной нагрузкой.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_25), 
    25
),
(
    DEFAULT, 
    'Обеспечение дренажа', 
    'ЩПС С6 улучшает водоотведение и защищает конструкции от затопления.', 
    NOW(), 
    NOW(), 
    NULL, 
    (SELECT "id" FROM inserted_material_25), 
    25
);
