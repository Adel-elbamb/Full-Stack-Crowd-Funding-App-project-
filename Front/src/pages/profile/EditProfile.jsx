import React, { useState } from 'react';
import styles from './EditProfile.module.css'; // Import the CSS Module

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        setError('Only PNG, JPG, and GIF images are allowed');
        return;
      }
      setError('');
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile updated with:', {
        ...formData,
        profileImage: profileImage ? 'Image uploaded' : 'No image'
      });
      
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <div className={styles.mainContent}>
        <h1>Edit Profile</h1>
        <div className={styles.tabs}>
          <span className={styles.activeTab}>My Details</span>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <div className={styles.profileContent}>
          <div className={styles.leftSection}>
            <div className={styles.profileImageSection}>
              <h3>Profile Image</h3>
              <div className={styles.imageUpload}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile preview" />
                ) : (
                  <div className={styles.placeholderImage} aria-label="No image selected">
                    <i className="fas fa-user profileIcon"></i>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  onChange={handleImageUpload}
                  id="image-upload"
                  disabled={isSubmitting}
                />
                <label htmlFor="image-upload">✎</label>
              </div>
              <p>Maximum 5MB. Accepts PNG, JPG, and GIF images.</p>
            </div>

            <div className={styles.basicDetails}>
              <h3>Basic Details</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  First name *
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                </label>
                <label>
                  Last name *
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                  />
                </label>
                <label>
                  Your email address
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    aria-disabled="true"
                  />
                </label>
                <p>
                  To change your email, contact{' '}
                  <a href="mailto:support@chuffed.org">support@chuffed.org</a>
                </p>
                <button 
                  type="submit" 
                  className={styles.updateButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
          <div className={styles.rightSection}>
            <h3>Change Your Password</h3>
            <p>You will receive an email to reset your password.</p>
            <button 
              className={styles.resetPasswordButton}
              disabled={isSubmitting}
            >
              Reset Password
            </button>
          </div>
        </div>

        <div className={styles.supportLinks}>
          <a href="/trainings" className={styles.supportLink}>
            <div className={styles.supportItem}>
              <i className="fas fa-graduation-cap supportIcon"></i>
              <h4>Trainings</h4>
              <p>Hear what works, what doesn't, and how to apply them to your own cause.</p>
            </div>
          </a>
          <a href="/help" className={styles.supportLink}>
            <div className={styles.supportItem}>
              <i className="fas fa-life-ring supportIcon"></i>
              <h4>Help and support</h4>
              <p>Find the answers you need on our most common questions.</p>
            </div>
          </a>
          <a href="/contact" className={styles.supportLink}>
            <div className={styles.supportItem}>
              <i className="fas fa-envelope supportIcon"></i>
              <h4>Contact us</h4>
              <p>Our support team is here to help you when setting up and running your campaign.</p>
            </div>
          </a>
        </div>

        <div className={styles.rightLinkContainer}>
          <a className={`${styles.backLink} nav-link`} href="/project">Back to Projects →</a>
         
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
