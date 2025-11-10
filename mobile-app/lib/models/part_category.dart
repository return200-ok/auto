class PartCategory {
  final int categoryId;
  final String name;
  final int? parentCategoryId;
  final String? description;

  PartCategory({
    required this.categoryId,
    required this.name,
    this.parentCategoryId,
    this.description,
  });

  factory PartCategory.fromJson(Map<String, dynamic> json) {
    return PartCategory(
      categoryId: json['category_id'],
      name: json['name'],
      parentCategoryId: json['parent_category_id'],
      description: json['description'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'category_id': categoryId,
      'name': name,
      'parent_category_id': parentCategoryId,
      'description': description,
    };
  }
}

